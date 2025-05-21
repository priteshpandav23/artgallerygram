import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    artworkId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    artist: {
      type: String,
      default: "Unknown",
    },
    medium: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Collection = mongoose.model("Collection", collectionSchema);

export default Collection;
