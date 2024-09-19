import express from "express";

import {
  GET_ALL_ANSWERS,
  CREATE_ANSWER,
  DELETE_ANSWER_BY_ID,
} from "../controller/answer.js";

import authUser from "../middleware/auth.js";

// GET /question/:id/answers
// POST /question/:id/answers
// DELETE /answer/:id

// CREATE_ANSWER // POST_ANSWER
// PAVADINIMAI NORMALUS

const router = express.Router();

router.get("/questions/:id/answers", GET_ALL_ANSWERS);
router.post("/questions/:id/answers", authUser, CREATE_ANSWER);
router.delete("/answers/:id", authUser, DELETE_ANSWER_BY_ID);

export default router;
