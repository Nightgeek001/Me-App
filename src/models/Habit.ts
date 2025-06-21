import mongoose, { Schema, Document } from 'mongoose';

export interface IHabit extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  name: string;
  category?: string;
  frequency: 'daily' | 'weekly';
  createdAt: Date;
}

const HabitSchema = new Schema<IHabit>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    category: { type: String },
    frequency: { type: String, enum: ['daily', 'weekly'], default: 'daily' }
  },
  { timestamps: true }
);

export default mongoose.model<IHabit>('Habit', HabitSchema);
