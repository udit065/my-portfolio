import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, enum: ["Full-stack", "Mobile", "Frontend"], required: true },
    featured: { type: Boolean, default: false },
    description: { type: String, required: true },
    stack: [String],
    links: { type: Map, of: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
