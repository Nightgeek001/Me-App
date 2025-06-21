import mongoose, { Schema, Document } from 'mongoose';

export interface IJournalEntry extends Document {
    userId: mongoose.Types.ObjectId | string;
    content: string;
    prompt?: string;
    date: Date;
}

const JournalEntrySchema: Schema = new Schema<IJournalEntry>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        content: { type: String, required: true },
        prompt: { type: String },
        date: { type: Date, required: true }
    },
    { timestamps: true }
);

JournalEntrySchema.index({ userId: 1, date: -1 }, { unique: true });

export default mongoose.model<IJournalEntry>('JournalEntry', JournalEntrySchema);