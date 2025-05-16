import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// POST a new post
router.post("/", async (req, res) => {
  try {
    const { title, author, imageUrl, likes = 0, comments = [] } = req.body;

    if (!title || !author || !imageUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newPost = new Post({
      title,
      author,
      imageUrl,
      likes,
      comments,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

// DELETE a post by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
});

export default router;
