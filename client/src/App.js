import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ChatApp from './components/chat/ChatApp';
import ChatRoom from './components/chat/ChatRoom';
import Dashboard from './components/dashboard/Dashboard';
import Announcements from './components/announcements/Announcements';
import Layout from './components/layout/Layout';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Help from './components/pages/Help';
import Events from './components/pages/Events';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AuthProvider>
      <SocketProvider>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<ProtectedRoute><Layout darkMode={darkMode} setDarkMode={setDarkMode}><Dashboard /></Layout></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute><Layout darkMode={darkMode} setDarkMode={setDarkMode}><ChatApp /></Layout></ProtectedRoute>} />
            <Route path="/chat-room" element={<ProtectedRoute><Layout darkMode={darkMode} setDarkMode={setDarkMode}><ChatRoom /></Layout></ProtectedRoute>} />
            <Route path="/announcements" element={<ProtectedRoute><Layout darkMode={darkMode} setDarkMode={setDarkMode}><Announcements /></Layout></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute><Layout darkMode={darkMode} setDarkMode={setDarkMode}><About /></Layout></ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute><Layout darkMode={darkMode} setDarkMode={setDarkMode}><Contact /></Layout></ProtectedRoute>} />
            <Route path="/help" element={<ProtectedRoute><Layout darkMode={darkMode} setDarkMode={setDarkMode}><Help /></Layout></ProtectedRoute>} />
            <Route path="/events" element={<ProtectedRoute><Layout darkMode={darkMode} setDarkMode={setDarkMode}><Events /></Layout></ProtectedRoute>} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </SocketProvider>
    </AuthProvider>
  );
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <motion.div
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p>Loading...</p>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}

export default App;
