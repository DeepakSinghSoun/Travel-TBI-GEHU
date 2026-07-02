import Homestay from "../models/Homestay.js";

// ================= GET ALL HOMESTAYS =================
export const getHomestays = async (req, res) => {
  try {
    const homestays = await Homestay.find();

    res.json({
      success: true,
      homestays,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= GET SINGLE HOMESTAY =================
export const getHomestayById = async (req, res) => {
  try {
    const homestay = await Homestay.findById(req.params.id);

    if (!homestay) {
      return res.status(404).json({
        success: false,
        message: "Homestay not found",
      });
    }

    res.json({
      success: true,
      homestay,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= CREATE HOMESTAY (ADMIN) =================
export const createHomestay = async (req, res) => {
  try {
    const homestay = await Homestay.create(req.body);

    res.status(201).json({
      success: true,
      homestay,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
