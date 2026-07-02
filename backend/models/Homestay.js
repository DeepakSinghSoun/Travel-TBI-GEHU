import mongoose from "mongoose";

const homestaySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    roomType: {
      type: String,
      default: "Standard",
    },

    availableRooms: {
      type: Number,
      default: 1,
    },

    // keep Date (better for filtering), but still safe
    availableFrom: {
      type: Date,
      default: null,
    },

    availableTo: {
      type: Date,
      default: null,
    },

    // support multiple images properly
    images: {
      type: [String],
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

const Homestay = mongoose.model("Homestay", homestaySchema);

export default Homestay;