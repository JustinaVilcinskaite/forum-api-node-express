import express from "express";

import {
  GET_ALL_QUESTIONS,
  CREATE_QUESTION,
  DELETE_QUESTION_BY_ID,
} from "../controller/question.js";

import authUser from "../middleware/auth.js";

// TODO: validation middleware/schema

const router = express.Router();

router.get("/questions", GET_ALL_QUESTIONS);
router.post("/questions", authUser, CREATE_QUESTION);
router.delete("/questions/:id", authUser, DELETE_QUESTION_BY_ID);

export default router;
