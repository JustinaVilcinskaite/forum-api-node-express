import express from "express";

import { SIGN_UP, LOGIN, VALIDATE_LOGIN } from "../controller/user.js";

import authUser from "../middleware/auth.js";
// import validate from "../middleware/validation.js";
// import userSchema from "../schema/user.js";

// POST /register
// POST /login
// router.post("/users", SIGN_UP);

const router = express.Router();

router.post("/users", SIGN_UP);
router.post("/login", LOGIN);
router.get("/login/validate", authUser, VALIDATE_LOGIN);

export default router;
