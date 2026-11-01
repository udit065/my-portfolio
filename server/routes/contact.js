import { Router } from "express";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import Message from "../models/Message.js";

const router = Router();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 5, standardHeaders: true, legacyHeaders: false });

// POST /api/contact  { name, email, message, website? }
router.post("/", limiter, async (req, res, next) => {
  try {
    const { name = "", email = "", message = "", website = "" } = req.body ?? {};

    // Honeypot: real users never fill the hidden "website" field.
    if (website) return res.status(201).json({ ok: true });

    const errors = {};
    if (!String(name).trim()) errors.name = "Please enter your name.";
    if (!EMAIL_RE.test(String(email).trim())) errors.email = "Please enter a valid email.";
    if (String(message).trim().length < 10) errors.message = "Message should be at least 10 characters.";
    if (Object.keys(errors).length) return res.status(400).json({ ok: false, errors });

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ ok: false, error: "Messages are unavailable right now. Please email me instead." });
    }

    await Message.create({ name, email, message });
    res.status(201).json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
