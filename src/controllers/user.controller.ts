import { Request, Response } from 'express';
import User from '../models/User';
import { AuthRequest } from '../middlewares/auth.middleware';

export const updateGitHubUsername = async (req: AuthRequest, res: Response) => {
  const { githubUsername } = req.body;

  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.githubUsername = githubUsername;
  await user.save();

  res.json({ message: 'GitHub username updated', githubUsername });
};
