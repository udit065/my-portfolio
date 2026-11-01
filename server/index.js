import "dotenv/config";
import mongoose from "mongoose";
import { createApp } from "./app.js";

const PORT = process.env.PORT || 5000;
const app = createApp();

app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));

if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection failed:", err.message));
} else {
  console.warn("MONGO_URI not set: serving projects from shared/portfolio.json, contact form disabled.");
}
