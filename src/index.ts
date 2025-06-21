import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import { authMiddleware } from './middlewares/auth.middleware';
import moodRoutes from './routes/mood.routes';
import sleepRoutes from './routes/sleep.routes';
import journalRoutes from './routes/journal.routes'; // Commented out until journal.routes is fixed
import habitRoutes from './routes/habit.routes'; // Commented out until habit.routes is fixed
import summaryRoutes from './routes/summary.routes'; // Commented out until summary.routes is fixed
import userRoutes from './routes/user.routes';
import reminderRoutes from './routes/reminder.routes'; // Commented out until reminder.routes is fixed


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/sleep', sleepRoutes); // Commented out until sleep.routes is fixed
app.use('/api/journal', journalRoutes); // Commented out until journal.routes is fixed
app.use('/api/habit', habitRoutes); // Commented out until habit.routes is fixed
app.use('/api/summary', summaryRoutes);
app.use('/api/user', userRoutes);
app.use('/api/reminders', reminderRoutes);

// Routes will go here later
app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: 'You are authenticated!', userId: (req as any).userId });
})

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
