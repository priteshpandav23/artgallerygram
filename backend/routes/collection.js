import express from "express";
import User from "../models/User.js";

const router = express.Router();

// ✅ Add artwork to user's collection
router.post("/add", async (req, res) => {
  try {
    const { userId, artwork } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const alreadyExists = user.collection.some(
      (item) => item.objectID === artwork.objectID
    );
    if (alreadyExists) {
      return res.status(400).json({ message: "Artwork already in collection" });
    }

    user.collection.push(artwork);
    await user.save();

    res.status(200).json({
      message: "Artwork added to collection",
      collection: user.collection,
    });
  } catch (err) {
    res.status(500).json({ message: "Error adding artwork", error: err.message });
  }
});

// ✅ Get user's collection
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.collection);
  } catch (err) {
    res.status(500).json({ message: "Error fetching collection", error: err.message });
  }
});

// ✅ Remove artwork from collection
router.delete("/remove", async (req, res) => {
  try {
    const { userId, objectID } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const initialLength = user.collection.length;
    user.collection = user.collection.filter(
      (item) => item.objectID !== objectID
    );

    if (user.collection.length === initialLength) {
      return res.status(404).json({ message: "Artwork not found in collection" });
    }

    await user.save();

    res.status(200).json({
      message: "Artwork removed from collection",
      collection: user.collection,
    });
  } catch (err) {
    res.status(500).json({ message: "Error removing artwork", error: err.message });
  }
});

export default router;
