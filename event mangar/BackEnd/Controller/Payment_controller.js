const stripe = require("../utils/stripe");
const Events = require("../Models/Event_model");
const User = require("../Models/User_model");
const Ticket = require("../Models/ticket_model");
const QRcode = require("../utils/qr");
const mongoose = require("mongoose");

// -------------------------------
// 1. CREATE CHECKOUT SESSION
// -------------------------------
const createCheckoutSession = async (req, res) => {
  try {
    const { eventId, quantity = 1 } = req.body;

    const event = await Events.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
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
          quantity,
        },
      ],
      mode: "payment",
      metadata: {
        userId: req.user._id.toString(),
        eventId: event._id.toString(),
        quantity: quantity.toString(),
      },
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
    });

    console.log("✅ Session Created:", session.id);
    console.log("🧠 Metadata:", session.metadata);

    res.json({ url: session.url });
  } catch (error) {
    console.error("❌ Stripe Error:", error);
    res
      .status(500)
      .json({ message: "Payment session failed", error: error.message });
  }
};

// -------------------------------
// 2. STRIPE WEBHOOK HANDLER
// -------------------------------
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
    console.error("❌ Webhook signature failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const userId = mongoose.Types.ObjectId(session.metadata.userId);
      const eventId = mongoose.Types.ObjectId(session.metadata.eventId);
      const quantity = parseInt(session.metadata.quantity || "1");

      const eventData = await Events.findById(eventId);
      if (!eventData) throw new Error("Event not found in webhook");

      const totalPrice = eventData.price * quantity;
      const qrCode = await QRcode(userId, eventId);

      const ticket = new Ticket({
        userId,
        eventId,
        quantity,
        totalPrice,
        paymentStatus: "paid",
        paymentId: session.payment_intent,
        qrCode,
      });

      await ticket.save();

      console.log("🎫 Ticket Created:", ticket);
    } catch (err) {
      console.error("❌ Error creating ticket:", err);
    }
  }

  res.status(200).json({ received: true });
};

// -------------------------------
// 3. VERIFY PAYMENT & GET TICKET
// -------------------------------
const verifyPayment = async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) {
      return res.status(400).json({ message: "Missing session ID" });
    }

    // const ticketInfo = await Ticket.findOne({
    //   userId: req.user._id,
    //   paymentId: sessionId,
    // }).populate("eventId", "title date location price");
    const ticketInfo = await Ticket.findOne({}).sort({ createdAt: -1 });

    if (!ticketInfo) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json({ success: true, ticketInfo });
  } catch (error) {
    console.error("❌ Error verifying payment:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createCheckoutSession,
  webhook,
  verifyPayment,
};
