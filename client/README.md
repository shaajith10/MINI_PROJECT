# College Chat Application

A real-time chat application built with React, Express.js, MongoDB, and Socket.io for seamless college student communication.

## Features

- 🔐 **User Authentication** - Secure signup and login system
- 💬 **Real-time Messaging** - Instant message delivery with Socket.io
- 🏫 **Department-based Rooms** - Organized chat rooms by college departments
- 👥 **Student Management** - Track online students and faculty
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎨 **Modern UI** - Beautiful and intuitive user interface
- ⚡ **Real-time Typing Indicators** - See when someone is typing
- 🔔 **Notifications** - Toast notifications for better UX
- 📚 **Academic Features** - Assignment help, exam preparation, and study groups

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Framer Motion (animations)
- React Icons
- Axios (HTTP client)
- Socket.io Client
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.io
- JWT Authentication
- Bcryptjs (password hashing)
- CORS

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd departmental-chat-app
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/departmental-chat
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system

5. **Run the application**
   ```bash
   npm run dev
   ```

   This will start both the backend server (port 5000) and frontend development server (port 3000)

## Usage

1. **Sign Up** - Create a new account with your department information
2. **Login** - Sign in with your credentials
3. **Join Rooms** - Select different departmental chat rooms
4. **Start Chatting** - Send messages in real-time
5. **View Team Members** - See who's online and all team members

## Project Structure

```
departmental-chat-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── auth/      # Authentication components
│   │   │   └── chat/      # Chat components
│   │   ├── contexts/      # React contexts
│   │   └── App.js
│   └── package.json
├── server/                # Express backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── index.js          # Server entry point
│   └── package.json
└── package.json          # Root package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Chat
- `GET /api/chat/messages/:roomId` - Get messages for a room
- `POST /api/chat/messages` - Send a message
- `GET /api/chat/users` - Get all users
- `GET /api/chat/users/online` - Get online users
- `PUT /api/chat/users/status` - Update user online status

## Socket Events

### Client to Server
- `join-room` - Join a chat room
- `leave-room` - Leave a chat room
- `send-message` - Send a message
- `user-typing` - User is typing
- `stop-typing` - User stopped typing

### Server to Client
- `receive-message` - Receive a new message
- `online-users` - List of online users
- `user-typing` - Someone is typing

## Deployment

### Frontend (Netlify/Vercel)
1. Build the React app: `cd client && npm run build`
2. Deploy the `build` folder to your hosting service

### Backend (Heroku/Railway)
1. Set environment variables in your hosting platform
2. Deploy the `server` folder
3. Update the Socket.io connection URL in the frontend

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
