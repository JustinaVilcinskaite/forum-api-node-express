import express from "express";

import {
  GET_QUESTION_WITH_ANSWERS,
  CREATE_ANSWER_FOR_QUESTION,
  DELETE_ANSWER_BY_ID,
  POST_LIKE_ANSWER,
  POST_DISLIKE_ANSWER,
} from "../controller/answer.js";

import authUser from "../middleware/auth.js";
import validate from "../middleware/validation.js";
import answerSchema from "../schema/answer.js";

const router = express.Router();

router.get("/questions/:id/answers", GET_QUESTION_WITH_ANSWERS);
router.post(
  "/questions/:id/answers",
  authUser,
  validate(answerSchema),
  CREATE_ANSWER_FOR_QUESTION
);
router.delete("/answers/:id", authUser, DELETE_ANSWER_BY_ID);
router.post("/answers/:id/like", authUser, POST_LIKE_ANSWER);
router.post("/answers/:id/dislike", authUser, POST_DISLIKE_ANSWER);
router.delete("/answers/:id", authUser, DELETE_ANSWER_BY_ID);

export default router;
