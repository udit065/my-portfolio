import { Router } from "express";
import mongoose from "mongoose";
import Project from "../models/Project.js";
import { content } from "../content.js";

const router = Router();

// GET /api/projects: from MongoDB when connected, otherwise from the bundled JSON.
router.get("/", async (_req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const projects = await Project.find().sort({ order: 1 }).lean();
      if (projects.length) return res.json(projects);
    }
    res.json(content.projects);
  } catch (err) {
    next(err);
  }
});

export default router;
