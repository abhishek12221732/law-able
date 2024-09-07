// controllers/quiz.controller.js
import Quiz from '../models/quiz.model.js';
import { errorHandler } from '../utils/error.js';

export const getQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    next(error);
  }
};

export const checkAnswer = async (req, res, next) => {
  const { questionId, answer } = req.body;
  try {
    const quiz = await Quiz.findById(questionId);
    if (!quiz) {
      return next(errorHandler(404, 'Quiz not found'));
    }
    const isCorrect = quiz.correctAnswer === answer;
    res.status(200).json({ isCorrect });
  } catch (error) {
    next(error);
  }
};