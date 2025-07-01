const QRcode = require("../utils/qr");
const Ticket = require("../Models/ticket_model");

const createTickets = async (req, res) => {
  try {
    const { eventId, quantity, totalPrice, paymentId } = req.body;

    const newTicketCreate = new Ticket({
      userId: req.user._id,
      eventId: eventId,
      quantity,
      totalPrice,
      paymentStatus: "paid",
      paymentId,
    });
    // Ticket save karne ke baad QR generate karein
    const savedTicket = await newTicketCreate.save();

    const qrCode = await QRcode(savedTicket.userId, savedTicket.eventId);

    // Yahan aap chahe to qrCode ko ticket me save kar sakte hain
    savedTicket.qrCode = qrCode;
    await savedTicket.save();

    res.status(201).json({ ticket: savedTicket, qrCode });
  } catch (error) {
    res.status(500).json({ error: "Ticket creation failed" });
  }
};

const getAllTicket = async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user._id })
      .populate("event", "title date location price")
      .sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ message: "Get all tickets successfully", tickets });
  } catch (error) {
    console.error("Get My Tickets error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const scanTicket = async (req, res) => {
  try {
    const { ticketId } = req.body;

    const ticket = await Ticket.findById(ticketId).populate("event");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    if (ticket.scanned) {
      return res.status(400).json({ message: "Ticket already used" });
    }

    ticket.scanned = true;
    await ticket.save();

    res.status(200).json({
      message: "Ticket valid & marked scanned",
      event: ticket.eventId.title,
    });
  } catch (error) {
    console.error("Scan Ticket error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { createTickets, getAllTicket, scanTicket };
