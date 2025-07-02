require("dotenv").config();
const express = require("express");
const cors = require("cors");
const conncetDB = require("./utils/DataBase.js");

const userRouter = require("./Router/User_Router.js");
const eventRouter = require("./Router/Event_router.js");
const paymentRouter = require("./Router/payment_router.js");
const ticketRouter = require("./Router/tickect_router.js");
const OrganizerRouter = require("./Router/Organizer_router.js");
const adminRouter = require("./Router/admin_router.js");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

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
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();
