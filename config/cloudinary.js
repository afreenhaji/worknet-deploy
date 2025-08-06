import cloudinary from "../config/cloudinary.js";

export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No profile image uploaded' });

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'profile_images'
    });

    await User.findByIdAndUpdate(req.user.id, { profileImage: result.secure_url }, { new: true });

    return res.json({ url: result.secure_url });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to upload profile image" });
  }
};

export const uploadCoverImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No cover image uploaded' });

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'cover_images'
    });

    await User.findByIdAndUpdate(req.user.id, { coverImage: result.secure_url }, { new: true });

    return res.json({ url: result.secure_url });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to upload cover image" });
  }
};