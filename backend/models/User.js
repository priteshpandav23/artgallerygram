import mongoose from "mongoose";

const artworkSchema = new mongoose.Schema({
  objectID: { type: Number, required: true },  // Harvard Art Museums object ID
  title: { type: String },
  artist: { type: String },
  image: { type: String },  // ✅ renamed from imageUrl → image
  medium: { type: String },
  date: { type: String },
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },

    // ✅ Embedded artwork collection
    collection: [artworkSchema],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
