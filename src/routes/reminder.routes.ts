import { Router } from 'express';
import {
  createReminder,
  getMyReminders,
  getDueReminders,
  deleteReminder
} from '../controllers/reminder.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, createReminder);
router.get('/', authMiddleware, getMyReminders);
router.get('/due', authMiddleware, getDueReminders);
router.delete('/:id', authMiddleware, deleteReminder);

export default router;
