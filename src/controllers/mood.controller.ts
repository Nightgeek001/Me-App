import { Request, Response } from "express";
import mongoose from "mongoose";
import MoodLog from "../models/MoodLog";
import { AuthRequest } from "../middlewares/auth.middleware";

export const addMoodLog = async (req: AuthRequest, res: Response) => {
    const { mood, note } = req.body;
    const userId = req.userId;

    if (!mood) return res.status(400).json({ message: "Mood value is required" });

    try {
        const log = await MoodLog.create({ userId, mood, note });
        res.status(201).json(log);
    } catch (err) {
        res.status(500).json({ message: "Failed to log mood", error: err });
    }
};

export const getMoodLogs = async (req: AuthRequest, res: Response) => {
    try {
        const logs = await MoodLog.find({ userId: req.userId }).sort({ date: -1 });
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch mood logs", error: err });
    }
};

export const getMoodTrend = async (req: AuthRequest, res: Response) => {
    try {
        const trend = await MoodLog.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(req.userId) } },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" },
                        day: { $dayOfMonth: "$date" }
                    },
                    averageMood: { $avg: "$mood" },
                    entries: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
        ]);

        res.json(trend);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch trend", error: err });
    }
};