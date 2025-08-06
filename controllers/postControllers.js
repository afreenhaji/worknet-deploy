import Post from "../models/Postmodel.js";

// Create Post
export const createPost = async (req, res) => {
  try {
    const { description } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!description || description.trim() === "") {
      return res.status(400).json({ error: "Post description is required." });
    }

    const newPost = await Post.create({
      author: req.user.id,
      description: description.trim(),
    });

    await newPost.populate("author", "firstName lastName profileImage headline");

    return res.status(201).json(newPost);
  } catch (error) {
    console.error("Create Post Error:", error);
    return res.status(500).json({ error: "Failed to create post" });
  }
};

// Get All Posts (Feed)
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "firstName lastName profileImage headline");

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Get All Posts Error:", error);
    return res.status(500).json({ error: "Could not fetch posts" });
  }
};

// Get Posts by Specific User
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .populate("author", "firstName lastName profileImage headline");

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Get User Posts Error:", error);
    return res.status(500).json({ error: "Could not fetch user posts" });
  }
};
