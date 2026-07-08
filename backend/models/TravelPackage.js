import mongoose from "mongoose";

const travelPackageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    duration: {
      type: Number, // Number of days
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    seats: {
      type: Number,
      required: true,
      min: 1,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Moderate", "Hard"],
      default: "Easy",
    },

    status: {
      type: String,
      enum: ["Available", "Full"],
      default: "Available",
    },

    includes: [
      {
        type: String,
      },
    ],

    itinerary: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const TravelPackage = mongoose.model(
  "TravelPackage",
  travelPackageSchema
);

export default TravelPackage;