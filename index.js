import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";

import userRouter from "./src/route/user.js";
import questionRouter from "./src/route/question.js";
import answerRouter from "./src/route/answer.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Connected to DB successfully"))
  .catch((err) => {
    console.log(err);
  });

app.use(userRouter);
app.use(questionRouter);
app.use(answerRouter);

app.use((req, res) => {
  return res
    .status(404)
    .send({ message: "Sorry, this endpoint does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log(
    `Your application is launched successfully on port ${process.env.PORT}`
  );
});
