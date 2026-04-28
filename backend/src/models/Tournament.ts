import mongoose, { Schema, Document } from "mongoose";

export interface ITournament extends Document {
  name: string;
  sportType: string;
  startDate: Date;
  endDate: Date;
  status: "upcoming" | "ongoing" | "completed";
  organizer: mongoose.Types.ObjectId;
}

const TournamentSchema: Schema = new Schema({
  name: { type: String, required: true },
  sportType: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ["upcoming", "ongoing", "completed"], default: "upcoming" },
  organizer: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export const Tournament = mongoose.model<ITournament>("Tournament", TournamentSchema);
