import { Router } from 'express';
import { addMoodLog, getMoodLogs, getMoodTrend } from '../controllers/mood.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post('/', authMiddleware, asyncHandler(addMoodLog));
router.get('/', authMiddleware, asyncHandler(getMoodLogs));
router.get('/trend', authMiddleware, asyncHandler(getMoodTrend)); // optional trend route

export default router;
