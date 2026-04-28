import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import tournamentRoutes from "./routes/tournaments";
import matchesRoutes from "./routes/matches";
import teamsRoutes from "./routes/teams";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Request Spy Middleware
app.use((req, res, next) => {
  console.log(`[SPY] ${req.method} ${req.url}`);
  next();
});

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "UP", message: "SportSync Backend is Alive" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/matches", matchesRoutes);
app.use("/api/teams", teamsRoutes);

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/sportsync";

mongoose.connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Basic Routes
app.get("/", (req, res) => {
  res.send("Sports Tournament API is running");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
