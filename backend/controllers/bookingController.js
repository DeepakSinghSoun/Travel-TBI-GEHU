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

    // Convert dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Calculate number of nights
    const nights = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );

    if (nights <= 0) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date",
      });
    }

    // Calculate total price
    // Assumes stay.price = price per room per night
    // const totalPrice = stay.price * nights;
    const totalPrice = stay.price * nights * guests;

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