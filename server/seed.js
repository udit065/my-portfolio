import "dotenv/config";
import mongoose from "mongoose";
import Project from "./models/Project.js";
import { content } from "./content.js";

if (!process.env.MONGO_URI) {
  console.error("Set MONGO_URI first.");
  process.exit(1);
}

await mongoose.connect(process.env.MONGO_URI);
const ops = content.projects.map((p, order) => ({
  updateOne: { filter: { slug: p.slug }, update: { ...p, order }, upsert: true },
}));
const res = await Project.bulkWrite(ops);
console.log(`Seeded projects: ${res.upsertedCount} new, ${res.modifiedCount} updated.`);
await mongoose.disconnect();
