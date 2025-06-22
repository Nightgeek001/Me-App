import { Router } from 'express';
import {
  createReminder,
  getMyReminders,
  getDueReminders,
  deleteReminder
} from '../controllers/reminder.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate';
import { reminderSchema } from '../validations/schemas';

const router = Router();

const asyncHandler = (fn: any) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.post('/', authMiddleware, validate(reminderSchema), asyncHandler(createReminder));
router.get('/', authMiddleware, asyncHandler(getMyReminders));
router.get('/due', authMiddleware, asyncHandler(getDueReminders));
router.delete('/:id', authMiddleware, asyncHandler(deleteReminder));

export default router;
