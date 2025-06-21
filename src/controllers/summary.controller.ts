import { Request, Response } from 'express';
import MoodLog from '../models/MoodLog';
import SleepLog from '../models/SleepLog';
import JournalEntry from '../models/JournalEntry';
import Habit from '../models/Habit';
import HabitCheckin from '../models/HabitCheckin';
import { AuthRequest } from '../middlewares/auth.middleware';
import { getCommitActivity, getOpenPRs } from '../services/github.service';
import User from '../models/User';

export const getDashboardSummary = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);

  try {
    // 📘 1. Mood
    const moods = await MoodLog.find({ userId, date: { $gte: weekAgo } }).sort({ date: -1 });
    const avgMood = moods.length ? moods.reduce((sum, m) => sum + m.mood, 0) / moods.length : null;
    const latestMood = moods[0]?.mood || null;

    // 😴 2. Sleep
    const sleeps = await SleepLog.find({ userId, sleepStart: { $gte: weekAgo } });
    const totalSleepHours = sleeps.reduce((sum, s) => sum + s.durationHours, 0);
    const avgSleep = sleeps.length ? totalSleepHours / sleeps.length : null;

    // 📓 3. Journal
    const todayStart = new Date(today.toDateString());
    const journal = await JournalEntry.findOne({ userId, date: todayStart });

    // ✅ 4. Habits
    const habits = await Habit.find({ userId });
    const todayStr = today.toISOString().slice(0, 10);

    const habitSummaries = await Promise.all(habits.map(async (habit) => {
      const checkins = await HabitCheckin.find({ userId, habitId: habit._id }).sort({ date: -1 });
      let streak = 0;
      let current = new Date();
      let longest = 0;
      for (const c of checkins) {
        const cDate = c.date.toISOString().slice(0, 10);
        const expected = current.toISOString().slice(0, 10);
        if (cDate === expected) {
          streak++;
          longest = Math.max(longest, streak);
          current.setDate(current.getDate() - 1);
        } else {
          break;
        }
      }
      return {
        name: habit.name,
        frequency: habit.frequency,
        currentStreak: streak,
        longestStreak: longest,
        checkedToday: checkins.some(c => c.date.toISOString().slice(0, 10) === todayStr)
      };
    }));

    // 🧪 GitHub Stats
    const user = await User.findById(req.userId);
    let githubStats = {
      commitsThisWeek: 0,
      prsOpen: 0
    };
    if (user?.githubUsername) {
      try {
        const [commits, prs] = await Promise.all([
          getCommitActivity(user.githubUsername),
          getOpenPRs(user.githubUsername)
        ]);
        githubStats = {
          commitsThisWeek: commits,
          prsOpen: prs
        };
      } catch (err) {
        // If GitHub API fails, keep stats at 0
      }
    }

    // 🧾 Response
    res.json({
      mood: {
        average: avgMood,
        latest: latestMood,
      },
      sleep: {
        averageHours: avgSleep,
        totalLast7Days: totalSleepHours,
      },
      journal: journal ? { content: journal.content, prompt: journal.prompt, date: journal.date } : null,
      habits: habitSummaries,
      github: githubStats
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load dashboard summary', error: err });
  }
};
