import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    homestay: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Homestay",
      required: true,
    },

    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    guests: {
      type: Number,
      required: true,
      min: 1,
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    // Booking Status
    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "rejected",
      ],
      default: "pending",
    },

    // Payment Status
    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "paid",
        "refunded",
      ],
      default: "pending",
    },

    // Optional Admin Notes
    adminNote: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model(
  "Booking",
  bookingSchema
);

export default Booking;