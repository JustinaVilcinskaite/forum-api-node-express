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

    const answers = await AnswerModel.find({ questionId: id });

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
      date: req.body.date,
      // ?
      questionId: req.params.id,
    });

    await answer.save();

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
    // if (answer.userId !== req.body.userId) {
    //   return res.status(403).json({
    //     message: "You can only delete answer that you posted",
    //   });
    // }

    await AnswerModel.deleteOne({ id: id });

    return res
      .status(200)
      .json({ message: "Answer has been deleted", answer: answer });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in application" });
  }
};

export {
  GET_QUESTION_WITH_ANSWERS,
  CREATE_ANSWER_FOR_QUESTION,
  DELETE_ANSWER_BY_ID,
};
