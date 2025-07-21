const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    maxTickets: { type: Number, required: true },
    ticketsSold: { type: Number, default: 0 },
    category: { type: String, required: true },
    image: { type: String, required: true },
    details: { type: String, required: true },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    organizerName: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("Event", eventSchema);
