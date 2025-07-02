const Events = require("../Models/Event_model");
const Ticket = require("../Models/ticket_model");

const GetOrganizerStats = async (req, res) => {
  try {
    const events = await Events.find({ organizer: req.user._id });

    let totalTicketSold = 0;
    let totalRevenue = 0;
    for (const event of events) {
      const tickets = await Ticket.find({
        event: event._id,
        paymentStatus: "paid",
      });
      const ticketsCount = tickets.reduce((acc, t) => acc + t.quantity, 0);
      const revenue = tickets.reduce((acc, t) => acc + t.totalPrice, 0);

      totalTicketSold += ticketsCount;
      totalRevenue += revenue;
    }

    res.status(200).json({
      success: true,
      totalEvents: events.length,
      totalTicketSold,
      totalRevenue,
    });
  } catch (error) {
    console.error("Organizer stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { GetOrganizerStats };
