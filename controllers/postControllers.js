import Post from "../models/Postmodel.js";
import User from "../models/user.model.js";

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate user existence
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch posts by user, sorted by newest first
    const posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .populate("author", "firstName lastName profileImage headline");

    return res.status(200).json(Array.isArray(posts) ? posts : []);
  } catch (error) {
    console.error("Get User Posts Error:", error);
    return res.status(500).json({ error: "Could not fetch user posts" });
  }
};
