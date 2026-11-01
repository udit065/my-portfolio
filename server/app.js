import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import projectsRouter from "./routes/projects.js";
import contactRouter from "./routes/contact.js";
import { content } from "./content.js";

export function createApp() {
  const app = express();
  const origins = (process.env.CLIENT_URL || "http://localhost:5173")
    .split(",")
    .map((s) => s.trim());

  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(cors({ origin: origins }));
  app.use(express.json({ limit: "20kb" }));

  app.get("/api/health", (_req, res) =>
    res.json({ ok: true, db: mongoose.connection.readyState === 1 })
  );
  app.get("/api/portfolio", (_req, res) => res.json(content));
  app.use("/api/projects", projectsRouter);
  app.use("/api/contact", contactRouter);

  app.use((_req, res) => res.status(404).json({ ok: false, error: "Not found" }));
  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ ok: false, error: "Something went wrong" });
  });

  return app;
}
