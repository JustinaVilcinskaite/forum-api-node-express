import express from "express";

import {
  GET_QUESTION_WITH_ANSWERS,
  CREATE_ANSWER_FOR_QUESTION,
  DELETE_ANSWER_BY_ID,
  POST_LIKE_ANSWER,
  POST_DISLIKE_ANSWER,
  GET_NET_SCORE_LIKES_FOR_ANSWER,
} from "../controller/answer.js";

import authUser from "../middleware/auth.js";

// TODO: validation middleware/schema

// GET /question/:id/answers
// POST /question/:id/answers
// DELETE /answer/:id

const router = express.Router();

// ??move to question route/REST convention
router.get("/questions/:id/answers", GET_QUESTION_WITH_ANSWERS);
router.post("/questions/:id/answers", authUser, CREATE_ANSWER_FOR_QUESTION);
//

router.post("/answers/:id/like", authUser, POST_LIKE_ANSWER);
router.post("/answers/:id/dislike", authUser, POST_DISLIKE_ANSWER);
router.get("/answers/:id/likes", GET_NET_SCORE_LIKES_FOR_ANSWER);

router.delete("/answers/:id", authUser, DELETE_ANSWER_BY_ID);

export default router;
