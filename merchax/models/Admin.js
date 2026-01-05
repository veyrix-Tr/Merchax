import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  role: { type: String, default: "admin" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
