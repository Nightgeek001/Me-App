import mongoose, { Schema, Document } from 'mongoose';

export interface IReminder extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'habit' | 'journal' | 'sleep' | 'custom';
  time: string; // "HH:mm"
  note?: string;
  active: boolean;
}

const ReminderSchema = new Schema<IReminder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['habit', 'journal', 'sleep', 'custom'], required: true },
    time: { type: String, required: true }, // e.g., "08:30"
    note: { type: String },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model<IReminder>('Reminder', ReminderSchema);
