import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    res.status(200).json({
      success: true,
      user,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {

    const { name, email, phone } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    await user.save();

    res.json({
      success: true,
      message: "Profile Updated Successfully",
      user,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// Change Password
export const changePassword = async (req, res) => {

  try {

    const {
      currentPassword,
      newPassword,
    } = req.body;

    const user = await User.findById(req.user._id);

    const match = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!match) {

      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });

    }

    user.password = await bcrypt.hash(
      newPassword,
      10
    );

    await user.save();

    res.json({
      success: true,
      message: "Password Changed Successfully",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};