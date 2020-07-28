import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const MessageSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});
