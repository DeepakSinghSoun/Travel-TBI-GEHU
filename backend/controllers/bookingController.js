import Booking from "../models/Booking.js";
import Homestay from "../models/Homestay.js";

// ================= CREATE BOOKING =================
export const createBooking = async (req, res) => {
  try {
    const { homestay, checkIn, checkOut, guests } = req.body;

    // Validate homestay exists
    const stay = await Homestay.findById(homestay);

    if (!stay) {
      return res.status(404).json({
        success: false,
        message: "Homestay not found",
      });
    }

    // calculate price properly
    const totalPrice = stay.price * (guests || 1);

    const booking = await Booking.create({
      user: req.user._id,
      homestay,
      checkIn,
      checkOut,
      guests,
      totalPrice,
    });

    res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= USER BOOKINGS =================
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    }).populate("homestay");

    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= ADMIN BOOKINGS =================
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user")
      .populate("homestay");

    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE STATUS =================
export const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )
      .populate("user")
      .populate("homestay");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};