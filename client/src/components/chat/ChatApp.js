import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useSocket } from '../../contexts/SocketContext';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import UserList from './UserList';
import './ChatApp.css';

const ChatApp = () => {
  const { user, logout } = useAuth();
  const { socket } = useSocket();
  const [currentRoom, setCurrentRoom] = useState('general');
  const [showUserList, setShowUserList] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (socket && user) {
      // Join the general room
      socket.emit('join-room', currentRoom);

      // Listen for online users updates
      socket.on('online-users', (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.off('online-users');
      };
    }
  }, [socket, user, currentRoom]);

  const handleRoomChange = (roomId) => {
    if (socket) {
      socket.emit('leave-room', currentRoom);
      setCurrentRoom(roomId);
      socket.emit('join-room', roomId);
    }
  };

  const handleLogout = () => {
    if (socket) {
      socket.disconnect();
    }
    logout();
  };

  return (
    <div className="chat-app">
      <motion.div
        className="chat-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Sidebar
          currentRoom={currentRoom}
          onRoomChange={handleRoomChange}
          onLogout={handleLogout}
          user={user}
        />
        
        <div className="main-content">
          <ChatArea
            currentRoom={currentRoom}
            user={user}
            socket={socket}
          />
        </div>

        <AnimatePresence>
          {showUserList && (
            <motion.div
              className="user-list-overlay"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <UserList
                onlineUsers={onlineUsers}
                onClose={() => setShowUserList(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          className="user-list-toggle"
          onClick={() => setShowUserList(!showUserList)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          👥
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ChatApp;




