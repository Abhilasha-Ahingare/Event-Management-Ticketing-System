const { Schema, model } = require("mongoose");

const ticketSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    quantity: { type: Number, default: 1 },
    totalPrice: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    paymentId: { type: String },
    qrCode: { type: String }, // data:image/png;base64,...
    scanned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = model("Ticket", ticketSchema);
