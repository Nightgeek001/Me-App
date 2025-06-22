import { Router } from 'express';
import { addSleepLog, getSleepLogs } from '../controllers/sleep.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate';
import { sleepLogSchema } from '../validations/schemas';



const router = Router();

const asyncHandler = (fn: any) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.post('/', authMiddleware, validate(sleepLogSchema), asyncHandler(addSleepLog));
router.get('/', authMiddleware, asyncHandler(getSleepLogs));

export default router;
