import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";

// Get My Profile
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Get Profile Error:", err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

// Update Profile Info (name, location, bio, etc.)
export const updateMyProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Update Profile Error:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

// Upload Profile Image to Cloudinary
export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No profile image uploaded" });
    }

    const imageUrl = await uploadOnCloudinary(req.file.path);
    if (!imageUrl) {
      return res.status(500).json({ error: "Image upload to Cloudinary failed" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage: imageUrl },
      { new: true }
    ).select("-password");

    res.status(200).json({ message: "Profile image updated", user });
  } catch (err) {
    console.error("Upload Profile Image Error:", err);
    res.status(500).json({ error: "Failed to upload profile image" });
  }
};

// Upload Cover Image to Cloudinary
export const uploadCoverImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No cover image uploaded" });
    }

    const imageUrl = await uploadOnCloudinary(req.file.path);
    if (!imageUrl) {
      return res.status(500).json({ error: "Image upload to Cloudinary failed" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { coverImage: imageUrl },
      { new: true }
    ).select("-password");

    res.status(200).json({ message: "Cover image updated", user });
  } catch (err) {
    console.error("Upload Cover Image Error:", err);
    res.status(500).json({ error: "Failed to upload cover image" });
  }
};
