import mongoose from "mongoose";
import { capitalizeFirstLetter } from "../utils/string-modifier.js";

const userSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: {
    type: String,
    required: true,
    set: capitalizeFirstLetter,
  },
  email: { type: String, required: true, lowercase: true },
  password: { type: String, required: true },
});

export default mongoose.model("User", userSchema);

// unique: true
