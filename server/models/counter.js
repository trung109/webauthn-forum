import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 1 }
  });
  
export const PostCounter = mongoose.model('Counter', counterSchema);