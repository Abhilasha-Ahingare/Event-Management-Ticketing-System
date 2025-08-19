const User = require("../Models/User_model");
const Event = require("../Models/Event_model");
const Ticket = require("../Models/ticket_model");

const getAdminStats = async (req, res) => {
  try {
    const totalUser = await User.countDocuments();
    const totalEvents = await Event.countDocuments();
    const tickets = await Ticket.find({ paymentStatus: "paid" });

    const totalTicketSold = tickets.reduce((acc, t) => acc + t.quantity, 0);
    const totalRevenue = tickets.reduce((acc, t) => acc + t.totalPrice, 0);

    const admindata = [totalUser, totalEvents, totalTicketSold, totalRevenue];

    res.status(200).json({
      message: "admin sucessfully come",admindata
    });
  } catch (error) {
    console.error("Admin stats error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAdminStats };
