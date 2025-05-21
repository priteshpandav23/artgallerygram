import mongoose from "mongoose";

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

    // ✅ Add collection field
    collection: [
      {
        objectID: { type: Number, required: true },  // Harvard Art Museums artwork ID
        title: String,
        artist: String,
        imageUrl: String,
        medium: String,
        date: String,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
