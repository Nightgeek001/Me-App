import { z } from 'zod';

//
// 😴 SleepLog Schema
//
export const sleepLogSchema = z.object({
  sleepStart: z.string().datetime({ message: 'Must be a valid ISO date string' }),
  sleepEnd: z.string().datetime({ message: 'Must be a valid ISO date string' }),
  durationHours: z
    .number()
    .min(0, 'Sleep duration must be at least 0 hours')
    .max(24, 'Sleep duration cannot exceed 24 hours'),
});

//
// ✅ Habit Schema
//
export const createHabitSchema = z.object({
  name: z.string().min(1, 'Habit name is required'),
  category: z.string().optional(),
  frequency: z.enum(['daily', 'weekly'], { required_error: 'Frequency is required' }),
});

export const checkHabitSchema = z.object({
  date: z.string().datetime().optional(),
});

//
// 📓 Journal Schema
//
export const journalSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  prompt: z.string().optional(),
  date: z.string().datetime({ message: 'Must be a valid ISO date string' }),
});

//
// 🔔 Reminder Schema
//
export const reminderSchema = z.object({
  type: z.enum(['habit', 'journal', 'sleep', 'custom'], {
    required_error: 'Reminder type is required',
  }),
  time: z.string().regex(/^\d{2}:\d{2}$/, {
    message: 'Time must be in HH:mm format',
  }),
  note: z.string().optional(),
});
