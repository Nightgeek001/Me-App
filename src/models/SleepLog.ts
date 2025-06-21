import mongoose, { Schema, Document } from 'mongoose';

export interface ISleepLog extends Document {
  userId: mongoose.Types.ObjectId;
  sleepStart: Date;
  sleepEnd: Date;
  quality?: number; // Optional: 1–5 scale
  durationHours: number;
}

const SleepLogSchema = new Schema<ISleepLog>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sleepStart: { type: Date, required: true },
    sleepEnd: { type: Date, required: true },
    quality: { type: Number },
    durationHours: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<ISleepLog>('SleepLog', SleepLogSchema);
