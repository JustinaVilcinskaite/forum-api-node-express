import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  questionTitle: { type: String, required: true },
  questionText: { type: String, required: true },
  date: { type: Date, default: Date.now },
  userId: { type: String, ref: "User", required: true },
  isAnswered: { type: Boolean, default: false },
});

export default mongoose.model("Question", questionSchema);
