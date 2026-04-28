import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash?: string;
  role: "admin" | "organizer" | "manager" | "user";
  googleId?: string;
  isVerified: boolean;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String }, // Optional for Google Auth
  role: { type: String, enum: ["admin", "organizer", "manager", "user"], default: "user" },
  googleId: { type: String },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

export const User = mongoose.model<IUser>("User", UserSchema);
