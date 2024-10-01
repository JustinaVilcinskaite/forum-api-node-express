import { v4 as uuidv4 } from "uuid";
import AnswerModel from "../model/answer.js";
import QuestionModel from "../model/question.js";

// TODO: validations

// Mongoose queries
const GET_QUESTION_WITH_ANSWERS = async (req, res) => {
  try {
    const id = req.params.id;

    const question = await QuestionModel.findOne({ id: id });

    if (!question) {
      return res
        .status(404)
        .json({ message: `Question with id ${id} does not exist.` });
    }

    const answers = await AnswerModel.find({ questionId: id }).sort({
      date: 1,
    });

    return res.status(200).json({
      question: question,
      answers: answers,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in application" });
  }
};

// MongoDB aggregation
// const GET_QUESTION_WITH_ANSWERS = async (req, res) => {
//   try {
//     const questionWithAnswers = await QuestionModel.aggregate([
//       {
//         $match: { id: req.params.id },
//       },
//       {
//         $lookup: {
//           from: "answers",
//           localField: "id",
//           foreignField: "questionId",
//           as: "answers",
//         },
//       },
//     ]);

//     //
//     if (!questionWithAnswers || questionWithAnswers.length === 0) {
//       return res.status(404).json({ message: "Question not found" });
//     }

//     return res.status(200).json({ questionWithAnswers: questionWithAnswers });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Error in application" });
//   }
// };

const CREATE_ANSWER_FOR_QUESTION = async (req, res) => {
  try {
    const answer = new AnswerModel({
      id: uuidv4(),
      answerText: req.body.answerText,
      // date: new Date(),
      // ?
      questionId: req.params.id,
      userId: req.body.userId,
      // gainedLikesNumber: req.body.gainedLikesNumber,
    });

    await answer.save();

    await QuestionModel.findOneAndUpdate(
      { id: req.params.id },
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

    //??? login/validate
    // user id/validation
    if (answer.userId !== req.body.userId) {
      return res.status(403).json({
        message: "You can only delete answer that you posted",
      });
    }

    await AnswerModel.deleteOne({ id: id });

    const remainingAnswers = await AnswerModel.find({
      questionId: answer.questionId,
    });

    if (remainingAnswers.length === 0) {
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
    const answer = await AnswerModel.findOne({ id: req.params.id });

    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    const userId = req.body.userId;

    if (answer.likedBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already liked this answer" });
    }

    if (answer.dislikedBy.includes(userId)) {
      answer.dislikedBy = answer.dislikedBy.filter((id) => id !== userId);

      answer.gainedLikesNumber += 1;
    } else {
      answer.gainedLikesNumber += 1;
    }

    answer.likedBy.push(userId);

    await answer.save();

    return res.status(200).json({
      message: "Post liked",
      netScore: answer.gainedLikesNumber,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in application" });
  }
};

const POST_DISLIKE_ANSWER = async (req, res) => {
  try {
    const answer = await AnswerModel.findOne({ id: req.params.id });

    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    const userId = req.body.userId;

    if (answer.dislikedBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already disliked this answer" });
    }

    if (answer.likedBy.includes(userId)) {
      answer.likedBy = answer.likedBy.filter((id) => id !== userId);

      answer.gainedLikesNumber -= 1;
    } else {
      answer.gainedLikesNumber -= 1;
    }

    answer.dislikedBy.push(userId);

    await answer.save();

    return res.status(200).json({
      message: "Post disliked",
      netScore: answer.gainedLikesNumber,
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
