import { Router } from 'express';
import { addSleepLog, getSleepLogs } from '../controllers/sleep.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

const asyncHandler = (fn: any) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.post('/', authMiddleware, asyncHandler(addSleepLog));
router.get('/', authMiddleware, asyncHandler(getSleepLogs));

export default router;
