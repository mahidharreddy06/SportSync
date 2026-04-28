import { Router } from "express";
import { Team } from "../models/Team";
import { authenticateToken, AuthRequest } from "../middleware/auth";

const router = Router();

// Get teams for a tournament
router.get("/:tournamentId", async (req, res) => {
  try {
    const teams = await Team.find({ tournamentId: req.params.tournamentId });
    res.json(teams);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Register a team to a tournament
router.post("/", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { name, members, tournamentId } = req.body;
    
    const team = new Team({
      name,
      contactInfo: members, // Storing members in contactInfo field as requested
      tournamentId,
      manager: req.user?.id
    });

    await team.save();
    res.status(201).json(team);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
