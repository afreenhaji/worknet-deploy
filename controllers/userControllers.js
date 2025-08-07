import User from "../models/user.model.js";

export const updateBio = async (req, res) => {
  try {
    const { bio } = req.body;

    if (typeof bio !== "string" || bio.trim().length === 0) {
      return res.status(400).json({ error: "Bio cannot be empty" });
    }

    const userId = req.user.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { bio: bio.trim() },
      { new: true }
    );

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
