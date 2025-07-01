const Event = require("../Models/Event_model");
const User = require("../Models/User_model");

const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      location,
      price,
      maxTickets,
      ticketsSold,
      category,
      image,
    } = req.body;

    const createEvents = await Event.create({
      title,
      description,
      date,
      location,
      price,
      maxTickets,
      ticketsSold,
      category,
      image,
      organizer: req.user._id, 
    });

    return res
      .status(200)
      .json({ message: "Event created successfully", event: createEvents });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create event", error: error.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const getevents = await Event.find().sort({ date: 1 });
    return res.status(200).json({ message: "get all events", getevents });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get events", error: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const singleEvent = await Event.findById(req.params.id);
    if (!singleEvent) {
      return res.status(404).json({ message: "event not found " });
    }
    return res.status(200).json({ message: "single event find", singleEvent });
  } catch (error) {
    res.status(500).json({ message: "sever error", error: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      location,
      price,
      maxTickets,
      ticketsSold,
      category,
      image,
    } = req.body;

    const eventId = req.params.id;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // // Only allow organizer or admin
    // if (
    //   req.user.role !== "admin" &&
    //   req.user._id.toString() !== event.organizer.toString()
    // ) {
    //   return res.status(403).json({ message: "Not authorized to update this event" });
    // }

    // Now update
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        title,
        description,
        date,
        location,
        price,
        maxTickets,
        ticketsSold,
        category,
        image,
        organizer: req.user._id,
      },
      { new: true, runValidators: true }
    );

    return res
      .status(200)
      .json({ message: "Updated successfully", updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id?.trim();
    const events = await Event.findById(eventId);

    if (!events) {
      res.status(404).json({ message: "event dont find" });
    }

    await Event.deleteOne(events);

    return res.status(200).json({ message: "event deleted sucessfuly" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
