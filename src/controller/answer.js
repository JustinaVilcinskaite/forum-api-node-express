import { v4 as uuidv4 } from "uuid";
import AnswerModel from "../model/answer.js";
import QuestionModel from "../model/question.js";
import UserModel from "../model/user.js";

const GET_QUESTION_WITH_ANSWERS = async (req, res) => {
  try {
    const questionId = req.params.id;

    const question = await QuestionModel.findOne({ id: questionId });

    if (!question) {
      return res
        .status(404)
        .json({ message: `Question with id ${questionId} does not exist.` });
    }

    const user = await UserModel.findOne({ id: question.userId }, "name");

    const answers = await AnswerModel.find({ questionId: questionId }).sort({
      gainedLikesNumber: -1,
    });

    const populatedAnswers = await Promise.all(
      answers.map(async (answer) => {
        const answerUser = await UserModel.findOne(
          { id: answer.userId },
          "name"
        );
        return { ...answer.toObject(), userName: answerUser.name };
      })
    );

    return res.status(200).json({
      question: { ...question.toObject(), userName: user.name },
      answers: populatedAnswers,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error in application" });
  }
};

const CREATE_ANSWER_FOR_QUESTION = async (req, res) => {
  try {
    const questionId = req.params.id;

    const question = await QuestionModel.findOne({ id: questionId });

    if (!question) {
      return res.status(400).json({ message: "This question does not exist" });
    }

    const answer = new AnswerModel({
      id: uuidv4(),
      answerText: req.body.answerText,
      date: req.body.date,
      questionId: questionId,
      userId: req.body.userId,
      gainedLikesNumber: req.body.gainedLikesNumber,
      likedBy: req.body.likedBy,
      dislikedBy: req.body.dislikedBy,
    });

    await answer.save();

    await QuestionModel.findOneAndUpdate(
      { id: questionId },
      { isAnswered: true }
    );

    return res
      .status(201)
      .json({ message: "Answer has been added", answer: answer });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in application" });
  }
};

const DELETE_ANSWER_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;

    const answer = await AnswerModel.findOne({ id: id });

    if (!answer) {
      return res
        .status(404)
        .json({ message: `Answer with id ${id} does not exist.` });
    }

    if (answer.userId !== req.body.userId) {
      return res.status(403).json({
        message: "You can only delete answer that you posted",
      });
    }

    await AnswerModel.deleteOne({ id: id });

    const remainingAnswers = await AnswerModel.find({
      questionId: answer.questionId,
    });

    if (!remainingAnswers.length) {
      await QuestionModel.findOneAndUpdate(
        { id: answer.questionId },
        { isAnswered: false }
      );
    }

    return res
      .status(200)
      .json({ message: "Answer has been deleted", answer: answer });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in application" });
  }
};

const POST_LIKE_ANSWER = async (req, res) => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({ message: "User id is required" });
    }

    const answer = await AnswerModel.findOne({ id: req.params.id });

    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    if (answer.likedBy.includes(userId)) {
      answer.likedBy = answer.likedBy.filter((id) => id !== userId);
      answer.gainedLikesNumber -= 1;
      await answer.save();
      return res.status(200).json({
        message: "Like removed, returning to neutral state",
        gainedLikesNumber: answer.gainedLikesNumber,
      });
    }

    if (answer.dislikedBy.includes(userId)) {
      answer.dislikedBy = answer.dislikedBy.filter((id) => id !== userId);
      answer.gainedLikesNumber += 1;
    }

    answer.likedBy.push(userId);
    answer.gainedLikesNumber += 1;

    await answer.save();
    return res.status(200).json({
      message: "Like added successfully",
      gainedLikesNumber: answer.gainedLikesNumber,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in application" });
  }
};

const POST_DISLIKE_ANSWER = async (req, res) => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({ message: "User id is required" });
    }
    const answer = await AnswerModel.findOne({ id: req.params.id });

    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    if (answer.dislikedBy.includes(userId)) {
      answer.dislikedBy = answer.dislikedBy.filter((id) => id !== userId);
      answer.gainedLikesNumber += 1;
      await answer.save();
      return res.status(200).json({
        message: "Dislike removed, returning to neutral state",
        gainedLikesNumber: answer.gainedLikesNumber,
      });
    }

    if (answer.likedBy.includes(userId)) {
      answer.likedBy = answer.likedBy.filter((id) => id !== userId);
      answer.gainedLikesNumber -= 1;
    }

    answer.dislikedBy.push(userId);
    answer.gainedLikesNumber -= 1;

    await answer.save();
    return res.status(200).json({
      message: "Dislike added successfully",
      gainedLikesNumber: answer.gainedLikesNumber,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in application" });
  }
};

const GET_NET_SCORE_LIKES_FOR_ANSWER = async (req, res) => {
  try {
    const answer = await AnswerModel.findOne({ id: req.params.id });

    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    return res.status(200).json({
      gainedLikesNumber: answer.gainedLikesNumber,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in application" });
  }
};

export {
  GET_QUESTION_WITH_ANSWERS,
  CREATE_ANSWER_FOR_QUESTION,
  DELETE_ANSWER_BY_ID,
  POST_LIKE_ANSWER,
  POST_DISLIKE_ANSWER,
  GET_NET_SCORE_LIKES_FOR_ANSWER,
};
