import mongoose, { Schema, Document } from 'mongoose';

export interface IMoodLog extends Document {
  userId: mongoose.Types.ObjectId;
  mood: number; // e.g., 1-5 or emoji scale
  note?: string;
  date: Date;
}

const MoodLogSchema = new Schema<IMoodLog>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mood: { type: Number, required: true },
    note: { type: String },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model<IMoodLog>('MoodLog', MoodLogSchema);
