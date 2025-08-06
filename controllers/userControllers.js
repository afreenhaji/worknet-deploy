import User from "../models/UserModel.js";

export const updateBio = async (req, res) => {
  try {
    const { bio } = req.body;

    if (!bio || bio.trim() === "") {
      return res.status(400).json({ error: "Bio cannot be empty" });
    }

    const userId = req.user.id;  // Authenticated user (from isAuth middleware)

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { bio: bio.trim() },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "Bio updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update Bio Error:", error);
    return res.status(500).json({ error: "Failed to update bio" });
  }
};
