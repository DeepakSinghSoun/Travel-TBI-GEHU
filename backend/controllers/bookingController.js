import Booking from "../models/Booking.js";

// CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      user: req.user._id,
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

// USER BOOKINGS
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

// ADMIN BOOKINGS
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

// UPDATE STATUS
export const updateBookingStatus = async (
  req,
  res
) => {
  try {
    const booking =
      await Booking.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
        },
        {
          new: true,
        }
      );

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