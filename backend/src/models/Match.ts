import mongoose, { Schema, Document } from "mongoose";

export interface IMatch extends Document {
  tournamentId: mongoose.Types.ObjectId;
  team1Id: mongoose.Types.ObjectId;
  team2Id: mongoose.Types.ObjectId;
  score1: number;
  score2: number;
  date: Date;
  status: "scheduled" | "ongoing" | "completed";
}

const MatchSchema: Schema = new Schema({
  tournamentId: { type: Schema.Types.ObjectId, ref: "Tournament", required: true },
  team1Id: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  team2Id: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  score1: { type: Number, default: 0 },
  score2: { type: Number, default: 0 },
  date: { type: Date, required: true },
  status: { type: String, enum: ["scheduled", "ongoing", "completed"], default: "scheduled" },
}, { timestamps: true });

export const Match = mongoose.model<IMatch>("Match", MatchSchema);
