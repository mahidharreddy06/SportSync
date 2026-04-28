import mongoose, { Schema, Document } from "mongoose";

export interface ITeam extends Document {
  name: string;
  contactInfo: string;
  tournamentId: mongoose.Types.ObjectId;
  manager: mongoose.Types.ObjectId;
}

const TeamSchema: Schema = new Schema({
  name: { type: String, required: true },
  contactInfo: { type: String },
  tournamentId: { type: Schema.Types.ObjectId, ref: "Tournament", required: true },
  manager: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export const Team = mongoose.model<ITeam>("Team", TeamSchema);
