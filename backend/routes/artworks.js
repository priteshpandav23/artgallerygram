import express from "express";
import Artwork from "../models/Artwork.js";

const router = express.Router();

// Get all artworks
router.get("/", async (req, res) => {
  try {
    const artworks = await Artwork.find();
    res.json(artworks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch artworks" });
  }
});

// Add new artwork
router.post("/", async (req, res) => {
  try {
    const { title, artist, imageUrl, description } = req.body;
    if (!title || !artist || !imageUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const artwork = new Artwork({ title, artist, imageUrl, description });
    await artwork.save();
    res.status(201).json(artwork);
  } catch (err) {
    res.status(500).json({ error: "Failed to save artwork" });
  }
});

// Delete artwork
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Artwork.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Artwork not found" });
    }
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete artwork" });
  }
});

export default router;
