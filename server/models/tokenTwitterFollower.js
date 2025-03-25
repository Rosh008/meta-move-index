import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    twitterHandle: { type: String, required: true, unique: true },
    followersCount: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
  });

const TokenSchema = mongoose.model("Token", tokenSchema);

export default TokenSchema;