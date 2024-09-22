import mongoose from "mongoose";

const answerSchema = mongoose.Schema({
  id: { type: String, required: true },
  answerText: { type: String, required: true },
  date: { type: Date, default: Date.now },
  // date:  { type: Date, required: true },
  gainedLikesNumber: { type: Number, default: 0 },
  questionId: { type: String, required: true },
});

export default mongoose.model("Answer", answerSchema);
