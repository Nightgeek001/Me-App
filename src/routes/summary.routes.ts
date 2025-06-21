import { Router } from 'express';
import { getDashboardSummary } from '../controllers/summary.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware, getDashboardSummary);

export default router;
