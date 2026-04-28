import { Router } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const router = Router();

// Health Check
router.get("/test", (req, res) => {
  res.json({ message: "Auth API is Online and Ready" });
});

// Google Auth (Secure Token Exchange)
router.post("/google", async (req, res) => {
  try {
    const { token: googleToken, role } = req.body;
    const decoded: any = jwt.decode(googleToken); // Basic decode to get info
    
    if (!decoded || !decoded.email) {
      return res.status(400).json({ message: "Invalid Google Token" });
    }

    const { email, name, sub: googleId } = decoded;
    
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, googleId, isVerified: true, role: role || "user" });
      await user.save();
    } else if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
