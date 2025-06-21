import { Request, Response } from 'express';
import Habit from '../models/Habit';
import HabitCheckin from '../models/HabitCheckin';
import { AuthRequest } from '../middlewares/auth.middleware';

export const createHabit = async (req: AuthRequest, res: Response) => {
  const { name, category, frequency } = req.body;
  const userId = req.userId;

  try {
    const habit = await Habit.create({ userId, name, category, frequency });
    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create habit', error: err });
  }
};

export const checkHabit = async (req: AuthRequest, res: Response) => {
  const { habitId } = req.params;
  const userId = req.userId;
  const date = req.body.date ? new Date(req.body.date) : new Date();

  try {
    const checkin = await HabitCheckin.findOneAndUpdate(
      { userId, habitId, date },
      { userId, habitId, date },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Habit checked', checkin });
  } catch (err) {
    res.status(500).json({ message: 'Failed to check habit', error: err });
  }
};

export const getHabitsWithStreaks = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;

  try {
    const habits = await Habit.find({ userId });
    const today = new Date().toISOString().slice(0, 10);

    const result = await Promise.all(
      habits.map(async (habit) => {
        const checkins = await HabitCheckin.find({ userId, habitId: habit._id }).sort({ date: -1 });

        // Calculate streaks
        let streak = 0;
        let currentDate = new Date();
        let longest = 0;

        for (const c of checkins) {
          const cDate = c.date.toISOString().slice(0, 10);
          const expected = currentDate.toISOString().slice(0, 10);

          if (cDate === expected) {
            streak++;
            longest = Math.max(longest, streak);
            currentDate.setDate(currentDate.getDate() - 1);
          } else {
            break;
          }
        }

        return {
          habit,
          currentStreak: streak,
          longestStreak: longest,
          checkedToday: checkins.some(c => c.date.toISOString().slice(0, 10) === today)
        };
      })
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch habits', error: err });
  }
};
