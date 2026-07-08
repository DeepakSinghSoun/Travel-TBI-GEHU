import TravelPackage from "../models/TravelPackage.js";

// ================= GET ALL PACKAGES =================
export const getAllPackages = async (req, res) => {
  try {
    const packages = await TravelPackage.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      packages,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= GET PACKAGE BY ID =================
export const getPackageById = async (req, res) => {
  try {
    const travelPackage = await TravelPackage.findById(
      req.params.id
    );

    if (!travelPackage) {
      return res.status(404).json({
        success: false,
        message: "Travel package not found",
      });
    }

    return res.status(200).json({
      success: true,
      travelPackage,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= CREATE PACKAGE =================
export const createPackage = async (req, res) => {
  try {
    const travelPackage =
      await TravelPackage.create(req.body);

    return res.status(201).json({
      success: true,
      travelPackage,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= UPDATE PACKAGE =================
export const updatePackage = async (req, res) => {
  try {
    const travelPackage =
      await TravelPackage.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!travelPackage) {
      return res.status(404).json({
        success: false,
        message: "Travel package not found",
      });
    }

    return res.status(200).json({
      success: true,
      travelPackage,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= DELETE PACKAGE =================
export const deletePackage = async (req, res) => {
  try {
    const travelPackage =
      await TravelPackage.findByIdAndDelete(
        req.params.id
      );

    if (!travelPackage) {
      return res.status(404).json({
        success: false,
        message: "Travel package not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Travel package deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};