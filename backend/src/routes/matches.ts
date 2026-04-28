import { Router } from "express";
import { Match } from "../models/Match";
import { Tournament } from "../models/Tournament";
import { authenticateToken, AuthRequest } from "../middleware/auth";

const router = Router();

// Get all matches for a tournament or all hot matches
router.get("/", async (req, res) => {
  try {
    const { tournamentId, status } = req.query;
    const filter: any = {};
    if (tournamentId) filter.tournamentId = tournamentId;
    if (status) filter.status = status;

    const matches = await Match.find(filter)
      .populate("team1Id", "name")
      .populate("team2Id", "name")
      .populate("tournamentId", "name");
    
    res.json(matches);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Arrange a match (Only Tournament Organizer)
router.post("/", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { tournamentId, team1Id, team2Id, date } = req.body;
    
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) return res.status(404).json({ message: "Tournament not found" });

    if (tournament.organizer.toString() !== req.user?.id) {
      return res.status(403).json({ message: "Only the tournament organizer can arrange matches" });
    }

    const match = new Match({
      tournamentId,
      team1Id,
      team2Id,
      date,
      status: "scheduled"
    });

    await match.save();
    res.status(201).json(match);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Update score (Only Tournament Organizer)
router.put("/:id/score", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { score1, score2, status } = req.body;
    const match = await Match.findById(req.params.id);
    if (!match) return res.status(404).json({ message: "Match not found" });

    const tournament = await Tournament.findById(match.tournamentId);
    if (!tournament) return res.status(404).json({ message: "Tournament not found" });

    if (tournament.organizer.toString() !== req.user?.id) {
      return res.status(403).json({ message: "Only the tournament organizer can change scores" });
    }

    match.score1 = score1 ?? match.score1;
    match.score2 = score2 ?? match.score2;
    match.status = status ?? match.status;

    await match.save();
    res.json(match);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
