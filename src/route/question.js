import express from "express";

import {
  GET_ALL_QUESTIONS,
  CREATE_QUESTION,
  DELETE_QUESTION_BY_ID,
} from "../controller/question.js";

import authUser from "../middleware/auth.js";
import validate from "../middleware/validation.js";
import questionSchema from "../schema/question.js";

const router = express.Router();

router.get("/questions", GET_ALL_QUESTIONS);
router.post("/questions", authUser, validate(questionSchema), CREATE_QUESTION);
router.delete("/questions/:id", authUser, DELETE_QUESTION_BY_ID);

export default router;
