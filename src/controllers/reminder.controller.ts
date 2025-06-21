import { Request, Response } from 'express';
import Reminder from '../models/Reminder';
import { AuthRequest } from '../middlewares/auth.middleware';

export const createReminder = async (req: AuthRequest, res: Response) => {
  const { type, time, note } = req.body;

  if (!type || !time) return res.status(400).json({ message: 'type and time are required' });

  try {
    const reminder = await Reminder.create({
      userId: req.userId,
      type,
      time,
      note
    });

    res.status(201).json(reminder);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create reminder', error: err });
  }
};

export const getMyReminders = async (req: AuthRequest, res: Response) => {
  const reminders = await Reminder.find({ userId: req.userId, active: true });
  res.json(reminders);
};

// For real-time reminder check (called by cron job or frontend)
export const getDueReminders = async (req: AuthRequest, res: Response) => {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // "HH:mm"

  try {
    const reminders = await Reminder.find({
      userId: req.userId,
      active: true,
      time: currentTime
    });

    res.json(reminders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch due reminders', error: err });
  }
};

export const deleteReminder = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const reminder = await Reminder.findOneAndDelete({ _id: id, userId: req.userId });

  if (!reminder) return res.status(404).json({ message: 'Reminder not found' });

  res.json({ message: 'Reminder deleted' });
};
