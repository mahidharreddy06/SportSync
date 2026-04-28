import { Router } from "express";
import { Tournament } from "../models/Tournament";
import { authenticateToken, AuthRequest } from "../middleware/auth";

const router = Router();

// Get all tournaments
router.get("/", async (req, res) => {
  try {
    const tournaments = await Tournament.find().populate("organizer", "name");
    res.json(tournaments);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

import mongoose from "mongoose";

// Get single tournament
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const tournament = await Tournament.findById(req.params.id).populate("organizer", "name email");
    if (!tournament) return res.status(404).json({ message: "Tournament not found" });
    res.json(tournament);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Create tournament (Anyone logged in)
router.post("/", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { name, sportType, startDate, endDate } = req.body;
    const newTournament = new Tournament({
      name,
      sportType,
      startDate,
      endDate,
      organizer: req.user?.id
    });

    await newTournament.save();
    res.status(201).json(newTournament);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Update Tournament (ONLY OWNER CAN UPDATE)
router.put("/:id", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) return res.status(404).json({ message: "Tournament not found" });

    // Check if the user is the owner (organizer) or an admin
    if (tournament.organizer.toString() !== req.user?.id && req.user?.role !== "admin") {
      return res.status(403).json({ message: "Access Denied: You are not the owner of this tournament" });
    }

    const updatedTournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    
    res.json(updatedTournament);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
