// routes/quiz.route.js
import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { getQuizzes, checkAnswer } from '../controllers/quiz.controller.js';

const router = express.Router();

router.get('/quizzes', verifyToken, getQuizzes);
router.post('/check-answer', verifyToken, checkAnswer);

export default router;