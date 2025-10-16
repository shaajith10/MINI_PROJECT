import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { FaPaperPlane, FaSmile, FaImage, FaFile } from 'react-icons/fa';
import axios from 'axios';

const ChatArea = ({ currentRoom, user, socket }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const roomNames = {
    general: 'General Discussion',
    'computer-science': 'Computer Science Department',
    electronics: 'Electronics Department',
    mechanical: 'Mechanical Engineering',
    civil: 'Civil Engineering',
    electrical: 'Electrical Engineering',
    it: 'Information Technology',
    business: 'Business Administration',
    commerce: 'Commerce Department',
    arts: 'Arts & Humanities',
    science: 'Science Department',
    assignments: 'Assignments Help',
    exams: 'Exam Preparation',
    events: 'College Events'
  };

  const roomDescriptions = {
    general: 'General college discussions and announcements',
    'computer-science': 'Computer Science students and faculty discussions',
    electronics: 'Electronics engineering discussions and projects',
    mechanical: 'Mechanical engineering projects and studies',
    civil: 'Civil engineering discussions and assignments',
    electrical: 'Electrical engineering projects and coursework',
    it: 'Information Technology department discussions',
    business: 'Business administration and management studies',
    commerce: 'Commerce and business studies discussions',
    arts: 'Arts, literature, and humanities discussions',
    science: 'Science department discussions and experiments',
    assignments: 'Help with assignments and coursework',
    exams: 'Exam preparation tips and study groups',
    events: 'College events, festivals, and activities'
  };

  useEffect(() => {
    fetchMessages();
  }, [currentRoom]);

  useEffect(() => {
    if (socket) {
      socket.on('receive-message', (messageData) => {
        setMessages(prev => [...prev, messageData]);
      });

      socket.on('user-typing', (data) => {
        if (data.userId !== user?.id) {
          setTypingUsers(prev => {
            const filtered = prev.filter(u => u.userId !== data.userId);
            return [...filtered, data];
          });

          setTimeout(() => {
            setTypingUsers(prev => prev.filter(u => u.userId !== data.userId));
          }, 3000);
        }
      });

      return () => {
        socket.off('receive-message');
        socket.off('user-typing');
      };
    }
  }, [socket, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/chat/messages/${currentRoom}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket) return;

    const messageData = {
      content: newMessage.trim(),
      roomId: currentRoom,
      sender: {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        department: user.department
      },
      createdAt: new Date()
    };

    // Send message via socket
    socket.emit('send-message', {
      ...messageData,
      roomId: currentRoom
    });

    // Add message to local state immediately
    setMessages(prev => [...prev, messageData]);
    setNewMessage('');

    // Save message to database
    try {
      await axios.post('/api/chat/messages', {
        content: messageData.content,
        roomId: currentRoom
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);

    if (socket) {
      socket.emit('user-typing', {
        userId: user.id,
        username: user.username,
        roomId: currentRoom
      });

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('stop-typing', {
          userId: user.id,
          roomId: currentRoom
        });
      }, 1000);
    }
  };

  const getMessageTime = (timestamp) => {
    return format(new Date(timestamp), 'HH:mm');
  };

  return (
    <div className="chat-area">
      <div className="chat-header">
        <h2 className="room-title">{roomNames[currentRoom] || 'General Discussion'}</h2>
        <p className="room-description">
          {roomDescriptions[currentRoom] || 'General discussions and announcements'}
        </p>
      </div>

      <div className="messages-container">
        {loading ? (
          <div className="loading-messages">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{
                width: '30px',
                height: '30px',
                border: '3px solid #f3f3f3',
                borderTop: '3px solid #667eea',
                borderRadius: '50%',
                margin: '20px auto'
              }}
            />
          </div>
        ) : (
          <>
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`message ${message.sender?.id === user?.id ? 'own' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="message-avatar">
                    {message.sender?.username?.charAt(0).toUpperCase()}
                  </div>
                  <div className="message-content">
                    <div className="message-header">
                      <span className="message-sender">{message.sender?.username}</span>
                      <span className="message-time">{getMessageTime(message.createdAt)}</span>
                    </div>
                    <div className="message-text">{message.content}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <AnimatePresence>
              {typingUsers.length > 0 && (
                <motion.div
                  className="typing-indicator"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {typingUsers.map((user, index) => (
                    <span key={index}>
                      {user.username} is typing
                      <div className="typing-dots">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                    </span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="message-input-container">
        <form onSubmit={handleSendMessage} className="message-input-form">
          <input
            type="text"
            value={newMessage}
            onChange={handleTyping}
            placeholder={`Message ${roomNames[currentRoom] || 'General Discussion'}...`}
            className="message-input"
            disabled={loading}
          />
          <motion.button
            type="submit"
            className="send-button"
            disabled={!newMessage.trim() || loading}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaPaperPlane />
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
