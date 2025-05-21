import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import artworkRoutes from "./routes/artworks.js";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import collectionRoutes from "./routes/collection.js"; // ✅ New

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route to verify backend server is running
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Routes
app.use("/api/artworks", artworkRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/collection", collectionRoutes); // ✅ New

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URL;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("Failed to connect to MongoDB", err);
});
