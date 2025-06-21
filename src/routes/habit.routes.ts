import { Router } from 'express';
import { createHabit, checkHabit, getHabitsWithStreaks } from '../controllers/habit.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, createHabit);
router.post('/:habitId/check', authMiddleware, checkHabit);
router.get('/', authMiddleware, getHabitsWithStreaks);

export default router;
