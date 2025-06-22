import { Router } from 'express';
import { createHabit, checkHabit, getHabitsWithStreaks } from '../controllers/habit.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate';
import { createHabitSchema, checkHabitSchema } from '../validations/schemas';

const router = Router();

router.post('/', authMiddleware, validate(createHabitSchema), createHabit);
router.post('/:habitId/check', authMiddleware, validate(checkHabitSchema), checkHabit);
router.get('/', authMiddleware, getHabitsWithStreaks);

export default router;
