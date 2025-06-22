import { Router } from 'express';
import { addMoodLog, getMoodLogs, getMoodTrend } from '../controllers/mood.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate';
import { createMoodSchema } from '../validations/mood.schema';

const router = Router();

const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post('/', authMiddleware, validate(createMoodSchema), asyncHandler(addMoodLog));
router.get('/', authMiddleware, asyncHandler(getMoodLogs));
router.get('/trends', authMiddleware, asyncHandler(getMoodTrend));

export default router;
