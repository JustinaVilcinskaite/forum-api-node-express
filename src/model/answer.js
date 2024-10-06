import mongoose from "mongoose";

const answerSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  answerText: { type: String, required: true },
  date: { type: Date, default: Date.now },
  gainedLikesNumber: { type: Number, default: 0 },
  likedBy: [{ type: String }],
  dislikedBy: [{ type: String }],
  questionId: { type: String, ref: "Question", required: true },
  userId: { type: String, ref: "User", required: true },
});

export default mongoose.model("Answer", answerSchema);
