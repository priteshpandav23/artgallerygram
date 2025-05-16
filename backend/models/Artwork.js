import mongoose from "mongoose";

const artworkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  imageUrl: { type: String },
  description: { type: String },
  year: { type: String }
});

export default mongoose.model("Artwork", artworkSchema);
