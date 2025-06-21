import { Router } from 'express';
import { addJournalEntry, getJournalEntries, getJournalByDate } from '../controllers/journal.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

function asyncHandler(fn: any) {
	return function (req: any, res: any, next: any) {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
}

router.post('/', authMiddleware, asyncHandler(addJournalEntry));
router.get('/', authMiddleware, asyncHandler(getJournalEntries));
router.get('/:date', authMiddleware, asyncHandler(getJournalByDate)); // Format: YYYY-MM-DD

export default router;
