import { v4 as uuidv4 } from "uuid";
import QuestionModel from "../model/question.js";
import AnswerModel from "../model/answer.js";


const CREATE_QUESTION = async (req, res) => {
  try {
    const question = new QuestionModel({
      id: uuidv4(),
      questionTitle: req.body.questionTitle,
      questionText: req.body.questionText,
      userId: req.body.userId,
      date: req.body.date,
      isAnswered: req.body.isAnswered,
    });

    await question.save();

    return res
      .status(201)
      .json({ message: "Question has been added", question: question });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in application" });
  }
};



const GET_ALL_QUESTIONS = async (req, res) => {
  try {
    const questions = await QuestionModel.find()
      .populate({
        path: "userId",
        select: "name",
        model: "User",
        localField: "userId",
        foreignField: "id",
      })
      .sort({ date: -1 });

    const response = questions.map((question) => ({
      id: question.id,
      questionTitle: question.questionTitle,
      questionText: question.questionText,
      date: question.date,
      userId: question.userId.id,
      name: question.userId.name,
      isAnswered: question.isAnswered,
    }));

    return res.status(200).json({ questions: response });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error in application" });
  }
};

const DELETE_QUESTION_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;

    const question = await QuestionModel.findOne({ id: id });

    if (!question) {
      return res
        .status(404)
        .json({ message: `Question with id ${id} does not exist.` });
    }

    if (question.userId !== req.body.userId) {
      return res.status(403).json({
        message: "You can only delete question that you posted",
      });
    }

    await AnswerModel.deleteMany({ questionId: id });

    await QuestionModel.deleteOne({ id: id });

    return res.status(200).json({
      message: "Question and it's answers have been deleted",
      question: question,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in application" });
  }
};

export { GET_ALL_QUESTIONS, CREATE_QUESTION, DELETE_QUESTION_BY_ID };
