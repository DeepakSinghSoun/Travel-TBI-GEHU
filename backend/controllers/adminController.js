import User from "../models/User.js";
import Homestay from "../models/Homestay.js";
import Booking from "../models/Booking.js";

// ================= ADMIN DASHBOARD =================
export const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalHomestays = await Homestay.countDocuments();
    const totalBookings = await Booking.countDocuments();

    const revenueResult = await Booking.aggregate([
      {
        $match: {
          status: "approved",
          // paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    const totalRevenue =
      revenueResult.length > 0
        ? revenueResult[0].totalRevenue
        : 0;

    
    // Booking Status
    const pendingBookings = await Booking.countDocuments({
      status: "pending",
    });

    const approvedBookings = await Booking.countDocuments({
      status: "approved",
    });

    const rejectedBookings = await Booking.countDocuments({
      status: "rejected",
    });

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalHomestays,
        totalBookings,
        totalRevenue,

        pendingBookings,
        approvedBookings,
        rejectedBookings,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL HOMESTAYS =================
export const getAllHomestays = async (req, res) => {
  try {
    const homestays = await Homestay.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      homestays,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= GET HOMESTAY BY ID =================
export const getHomestayById = async (req, res) => {
  try {
    const homestay = await Homestay.findById(req.params.id);

    if (!homestay) {
      return res.status(404).json({
        success: false,
        message: "Homestay not found",
      });
    }

    return res.status(200).json({
      success: true,
      homestay,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= CREATE HOMESTAY =================
export const createHomestay = async (req, res) => {
  try {
    const homestay = await Homestay.create(req.body);

    return res.status(201).json({
      success: true,
      homestay,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= UPDATE HOMESTAY =================
export const updateHomestay = async (req, res) => {
  try {
    const homestay = await Homestay.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!homestay) {
      return res.status(404).json({
        success: false,
        message: "Homestay not found",
      });
    }

    return res.status(200).json({
      success: true,
      homestay,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= DELETE HOMESTAY =================
export const deleteHomestay = async (req, res) => {
  try {
    const homestay = await Homestay.findByIdAndDelete(
      req.params.id
    );

    if (!homestay) {
      return res.status(404).json({
        success: false,
        message: "Homestay not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Homestay deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= GET ALL USERS =================
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= GET ALL BOOKINGS =================
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("homestay", "title location")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= UPDATE BOOKING STATUS =================
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      booking,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= DELETE BOOKING =================
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(
      req.params.id
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};