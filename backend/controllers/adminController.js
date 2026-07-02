import User from "../models/User.js";
import Homestay from "../models/Homestay.js";
import Booking from "../models/Booking.js";

// ================= ADMIN DASHBOARD =================
export const getDashboard = async (req, res) => {
  try {
    // Count documents
    const totalUsers = await User.countDocuments();
    const totalHomestays = await Homestay.countDocuments();
    const totalBookings = await Booking.countDocuments();

    // Calculate total revenue
    const revenueResult = await Booking.aggregate([
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

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalHomestays,
        totalBookings,
        totalRevenue,
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