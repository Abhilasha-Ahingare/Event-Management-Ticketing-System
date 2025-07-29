require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const conncetDB = require("./utils/DataBase.js");

const userRouter = require("./Router/User_Router.js");
const eventRouter = require("./Router/Event_router.js");
const paymentRouter = require("./Router/payment_router.js");
const ticketRouter = require("./Router/tickect_router.js");
const OrganizerRouter = require("./Router/Organizer_router.js");
const adminRouter = require("./Router/admin_router.js");

// ✅ IMPORT Stripe Webhook handler directly
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const webhook = require("./Controller/Payment_controller.js");

const app = express();

// ✅ Stripe Webhook FIRST — raw body parser
app.post(
  "/api/payment/webhook",
  express.raw({ type: "application/json" }),
  webhook.webhook
);

// ✅ Now apply other middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// ✅ Normal JSON parsing for rest of app
app.use(express.json());

// ✅ Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routers
app.use("/api/auth", userRouter);
app.use("/api/event", eventRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/tickets", ticketRouter);
app.use("/api/organizer", OrganizerRouter);
app.use("/api/admin", adminRouter);

const PORT = process.env.PORT || 4001;

const startServer = async () => {
  try {
    await conncetDB();
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error("❌ Failed to start server", error);
    process.exit(1);
  }
};

startServer();
