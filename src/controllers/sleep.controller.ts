import { Request, Response } from 'express';
import SleepLog from '../models/SleepLog';
import { AuthRequest } from '../middlewares/auth.middleware';

export const addSleepLog = async (req: AuthRequest, res: Response) => {
  const { sleepStart, sleepEnd, quality } = req.body;
  const userId = req.userId;

  try {
    const start = new Date(sleepStart);
    const end = new Date(sleepEnd);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    const durationMs = end.getTime() - start.getTime();
    if (durationMs <= 0) {
      return res.status(400).json({ message: 'Sleep end must be after sleep start' });
    }

    const durationHours = Math.round((durationMs / 1000 / 60 / 60) * 100) / 100;

    const log = await SleepLog.create({
      userId,
      sleepStart: start,
      sleepEnd: end,
      quality,
      durationHours
    });

    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ message: 'Failed to log sleep', error: err });
  }
};

export const getSleepLogs = async (req: AuthRequest, res: Response) => {
  try {
    const logs = await SleepLog.find({ userId: req.userId }).sort({ sleepStart: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch sleep logs', error: err });
  }
};
