import mongoose, { Schema, Document } from "mongoose";

export interface IStanding extends Document {
  tournamentId: mongoose.Types.ObjectId;
  teamId: mongoose.Types.ObjectId;
  wins: number;
  losses: number;
  points: number;
}

const StandingSchema: Schema = new Schema({
  tournamentId: { type: Schema.Types.ObjectId, ref: "Tournament", required: true },
  teamId: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
}, { timestamps: true });

export const Standing = mongoose.model<IStanding>("Standing", StandingSchema);
