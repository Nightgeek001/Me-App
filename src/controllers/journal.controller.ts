import { Request, Response } from 'express';
import JournalEntry from '../models/JournalEntry';
import { AuthRequest } from '../middlewares/auth.middleware';

export const addJournalEntry = async (req: AuthRequest, res: Response) => {
  const { content, prompt, date } = req.body;
  const userId = req.userId;

  try {
    if (!content || !date) {
      return res.status(400).json({ message: 'Content and date are required' });
    }

    const entryDate = new Date(date);
    const existing = await JournalEntry.findOne({ userId, date: entryDate });

    if (existing) {
      // Update existing journal
      existing.content = content;
      existing.prompt = prompt;
      await existing.save();
      return res.status(200).json(existing);
    }

    const newEntry = await JournalEntry.create({ userId, content, prompt, date: entryDate });
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save journal entry', error: err });
  }
};

export const getJournalEntries = async (req: AuthRequest, res: Response) => {
  try {
    const entries = await JournalEntry.find({ userId: req.userId }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch journal entries', error: err });
  }
};

export const getJournalByDate = async (req: AuthRequest, res: Response) => {
  const { date } = req.params;
  try {
    const entryDate = new Date(date);
    const entry = await JournalEntry.findOne({ userId: req.userId, date: entryDate });

    if (!entry) return res.status(404).json({ message: 'No journal entry found for that date' });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch journal entry', error: err });
  }
};
