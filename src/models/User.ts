import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
