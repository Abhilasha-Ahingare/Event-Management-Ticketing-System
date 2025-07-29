const stripe = require("../utils/stripe");
const Events = require("../Models/Event_model");
const User = require("../Models/User_model");
const Ticket = require("../Models/ticket_model");
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
      metadata: {
        userId: req.user.id,
        eventId: eventId,
        quantity: quantity || 1,
      },
      // success_url: `${process.env.CLIENT_URL}/payment-success`,
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

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
      const eventData = await Events.findById(eventId);

      const totalPrice = eventData.price * quantity;
      let ticket = new Ticket({
        userId: userId,
        eventId: eventId,
        quantity,
        totalPrice,
        paymentId: session.payment_intent,
        paymentStatus: "paid",
      });

      const qrCode = await QRcode(userId, eventId);
      ticket.qrCode = qrCode;
      await ticket.save();
      console.log(`🎟 Ticket created for user ${userId} for event ${eventId}`);
    } catch (err) {
      console.error("Error creating ticket after payment:", err);
    }
  }

  res.status(200).json({ received: true });
};

const verifyPayment = async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) {
      return res.status(400).json({ message: "Missing session ID" });
    }

    // 🔄 Verify with Stripe (example only)
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // You can now use session info to get customer, amount, etc.
    const ticketInfo = {
      eventName: "Event Title Placeholder", // Replace with real data
      quantity: 1, // Replace with real data
    };

    return res.status(200).json({ success: true, ticketInfo });
  } catch (error) {
    console.error("❌ Error verifying payment:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createCheckoutSession, webhook, verifyPayment };
