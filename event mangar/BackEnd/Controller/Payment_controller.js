const stripe = require("../utils/stripe");
const Events = require("../Models/Event_model");
const User = require("../Models/User_model");
const Ticket = require("./ticket_controller");
const QRcode = require("../utils/qr");

const createCheckoutSession = async (req, res) => {
  try {
    const { eventId, quantity } = req.body;
    const event = await Events.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "event not found" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: event.title,
              description: event.description,
            },
            unit_amount: event.price * 100,
          },
          quantity: quantity || 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
    });
    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    res
      .status(500)
      .json({ message: "Payment session failed", error: error.message });
  }
};

const webhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const userId = session.metadata.userId;
    const eventId = session.metadata.eventId;
    const quantity = parseInt(session.metadata.quantity);

    try {
      const eventData = await Event.findById(eventId);

      const totalPrice = eventData.price * quantity;
      let ticket = new Ticket({
        user: userId,
        event: eventId,
        quantity,
        totalPrice,
        paymentId: session.payment_intent,
        paymentStatus: "paid",
      });

      const qrCode = await QRcode.toDataURL(ticket._id.toString());
      ticket.qrCode = qrCode;
      await ticket.save();
      console.log(`🎟 Ticket created for user ${userId} for event ${eventId}`);
    } catch (err) {
      console.error("Error creating ticket after payment:", err);
    }
  }

  res.status(200).json({ received: true });
};

module.exports = { createCheckoutSession, webhook };
