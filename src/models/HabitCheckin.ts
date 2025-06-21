import mongoose, { Schema, Document } from 'mongoose';

export interface IHabitCheckin extends Document {
  userId: mongoose.Types.ObjectId;
  habitId: mongoose.Types.ObjectId;
  date: Date;
}

const HabitCheckinSchema = new Schema<IHabitCheckin>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    habitId: { type: Schema.Types.ObjectId, ref: 'Habit', required: true },
    date: { type: Date, required: true }
  },
  { timestamps: true }
);

HabitCheckinSchema.index({ userId: 1, habitId: 1, date: 1 }, { unique: true });

export default mongoose.model<IHabitCheckin>('HabitCheckin', HabitCheckinSchema);
