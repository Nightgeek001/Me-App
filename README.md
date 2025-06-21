# Me-App Backend 🚀

A comprehensive Node.js/TypeScript backend for a personal wellness tracking application. This API provides endpoints for mood tracking, sleep logging, habit management, journal entries, and more to help users monitor and improve their overall well-being.

## 🌟 Features

### 🔐 Authentication
- User registration and login with JWT tokens
- Secure password hashing with bcrypt
- Protected routes with middleware authentication

### 📊 Wellness Tracking
- **Mood Tracking**: Log daily moods and view trends
- **Sleep Logging**: Track sleep duration and quality
- **Habit Management**: Create habits and track streaks
- **Journal Entries**: Write and retrieve personal journal entries
- **Reminders**: Set and manage personal reminders

### 📈 Analytics & Insights
- **Dashboard Summary**: Get comprehensive wellness overview
- **Mood Trends**: Analyze mood patterns over time
- **Habit Streaks**: Track consistency and progress
- **GitHub Integration**: Monitor coding activity and contributions

### 🛠 Technical Features
- **TypeScript**: Full type safety and better development experience
- **MongoDB**: Flexible NoSQL database with Mongoose ODM
- **Express.js**: Fast and minimalist web framework
- **CORS Support**: Cross-origin resource sharing enabled
- **Environment Configuration**: Secure environment variable management

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nightgeek001/Me-App.git
   cd Me-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/me-app
   JWT_SECRET=your-super-secret-jwt-key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Mood Tracking

#### Add Mood Log
```http
POST /api/mood
Authorization: Bearer <token>
Content-Type: application/json

{
  "mood": 5,
  "notes": "Feeling great today!"
}
```

#### Get Mood Logs
```http
GET /api/mood
Authorization: Bearer <token>
```

#### Get Mood Trends
```http
GET /api/mood/trends
Authorization: Bearer <token>
```

### Sleep Tracking

#### Add Sleep Log
```http
POST /api/sleep
Authorization: Bearer <token>
Content-Type: application/json

{
  "sleepTime": "2024-01-15T22:00:00Z",
  "wakeTime": "2024-01-16T07:00:00Z",
  "quality": 4
}
```

#### Get Sleep Logs
```http
GET /api/sleep
Authorization: Bearer <token>
```

### Habit Management

#### Create Habit
```http
POST /api/habit
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Daily Exercise",
  "description": "30 minutes of exercise",
  "frequency": "daily"
}
```

#### Check-in Habit
```http
POST /api/habit/:habitId/checkin
Authorization: Bearer <token>
```

#### Get Habits with Streaks
```http
GET /api/habit
Authorization: Bearer <token>
```

### Journal Entries

#### Add Journal Entry
```http
POST /api/journal
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Today was an amazing day...",
  "mood": 5
}
```

#### Get Journal Entries
```http
GET /api/journal
Authorization: Bearer <token>
```

#### Get Journal by Date
```http
GET /api/journal/date/:date
Authorization: Bearer <token>
```

### Dashboard Summary

#### Get Dashboard Summary
```http
GET /api/summary
Authorization: Bearer <token>
```

### User Management

#### Update GitHub Username
```http
PUT /api/user/github
Authorization: Bearer <token>
Content-Type: application/json

{
  "githubUsername": "nightgeek001"
}
```

## 🏗 Project Structure

```
src/
├── controllers/          # Route controllers
│   ├── auth.controller.ts
│   ├── habit.controller.ts
│   ├── journal.controller.ts
│   ├── mood.controller.ts
│   ├── reminder.controller.ts
│   ├── sleep.controller.ts
│   ├── summary.controller.ts
│   └── user.controller.ts
├── middlewares/          # Custom middleware
│   └── auth.middleware.ts
├── models/              # MongoDB schemas
│   ├── Habit.ts
│   ├── HabitCheckin.ts
│   ├── JournalEntry.ts
│   ├── MoodLog.ts
│   ├── Reminder.ts
│   ├── SleepLog.ts
│   └── User.ts
├── routes/              # API routes
│   ├── auth.routes.ts
│   ├── habit.routes.ts
│   ├── journal.routes.ts
│   ├── mood.routes.ts
│   ├── reminder.routes.ts
│   ├── sleep.routes.ts
│   ├── summary.routes.ts
│   └── user.routes.ts
├── services/            # External service integrations
│   └── github.service.ts
└── index.ts            # Main application file
```

## 🛠 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the TypeScript project
- `npm start` - Start production server

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | Required |
| `JWT_SECRET` | JWT signing secret | Required |

### Database Models

The application uses MongoDB with the following collections:
- **Users**: User accounts and authentication
- **MoodLogs**: Daily mood tracking entries
- **SleepLogs**: Sleep duration and quality data
- **Habits**: Habit definitions and configurations
- **HabitCheckins**: Daily habit completion tracking
- **JournalEntries**: Personal journal entries
- **Reminders**: User reminders and notifications

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Sensitive endpoints require authentication
- **Environment Variables**: Sensitive data stored in environment variables
- **CORS Configuration**: Proper cross-origin resource sharing setup

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**NightGeek001**
- GitHub: [@Nightgeek001](https://github.com/Nightgeek001)

## 🙏 Acknowledgments

- Express.js team for the amazing web framework
- MongoDB team for the flexible database
- TypeScript team for the type safety
- All contributors and users of this project

---

⭐ **Star this repository if you find it helpful!** 