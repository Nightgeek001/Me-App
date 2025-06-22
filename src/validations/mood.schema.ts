import { z } from 'zod';

export const createMoodSchema = z.object({
  mood: z
    .number({
      required_error: 'Mood is required',
      invalid_type_error: 'Mood must be a number',
    })
    .min(1, 'Mood must be at least 1')
    .max(5, 'Mood cannot be more than 5'),
  note: z.string().optional(),
  date: z.string().datetime().optional()
});
