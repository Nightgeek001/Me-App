import { Router } from 'express';
import { updateGitHubUsername } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.put('/github', authMiddleware, async (req, res, next) => {
  try {
    await updateGitHubUsername(req as any, res);
  } catch (err) {
    next(err);
  }
});

export default router;
