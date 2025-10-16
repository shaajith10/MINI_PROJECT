import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaCircle } from 'react-icons/fa';
import axios from 'axios';

const UserList = ({ onlineUsers, onClose }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('/api/chat/users');
      setAllUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDepartmentColor = (department) => {
    const colors = {
      'Computer Science': '#667eea',
      'Electronics': '#f093fb',
      'Mechanical': '#4facfe',
      'Civil': '#43e97b',
      'Electrical': '#fa709a',
      'Information Technology': '#ffecd2',
      'Business Administration': '#a8edea',
      'Commerce': '#fed6e3',
      'Arts': '#d299c2',
      'Science': '#fad0c4'
    };
    return colors[department] || '#667eea';
  };

  const getRoleIcon = (role) => {
    const icons = {
      'Student': '🎓',
      'Teacher': '👨‍🏫',
      'Admin': '👑'
    };
    return icons[role] || '🎓';
  };

  if (loading) {
    return (
      <div className="user-list">
        <div className="user-list-header">
          <h3 className="user-list-title">College Members</h3>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            style={{
              width: '30px',
              height: '30px',
              border: '3px solid #f3f3f3',
              borderTop: '3px solid #667eea',
              borderRadius: '50%',
              margin: '0 auto'
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="user-list">
      <div className="user-list-header">
        <h3 className="user-list-title">College Members</h3>
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      <div className="users-section">
        <h4 style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          color: '#666', 
          marginBottom: '15px',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          Online Now ({onlineUsers.length})
        </h4>
        
        {onlineUsers.map((user) => (
          <motion.div
            key={user._id}
            className="user-item"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ backgroundColor: '#f8f9fa' }}
          >
            <div 
              className="user-item-avatar"
              style={{ 
                background: `linear-gradient(135deg, ${getDepartmentColor(user.department)} 0%, #764ba2 100%)` 
              }}
            >
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="user-item-info">
              <h4>{user.username}</h4>
              <p>{user.department} • {user.yearOfStudy}</p>
              <p style={{ fontSize: '10px', color: '#999' }}>Roll: {user.rollNumber}</p>
            </div>
            <div className="online-indicator">
              <FaCircle size={8} color="#27ae60" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="users-section" style={{ marginTop: '30px' }}>
        <h4 style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          color: '#666', 
          marginBottom: '15px',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          All Members ({allUsers.length})
        </h4>
        
        {allUsers.map((user) => (
          <motion.div
            key={user._id}
            className="user-item"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            whileHover={{ backgroundColor: '#f8f9fa' }}
          >
            <div 
              className="user-item-avatar"
              style={{ 
                background: `linear-gradient(135deg, ${getDepartmentColor(user.department)} 0%, #764ba2 100%)` 
              }}
            >
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="user-item-info">
              <h4>
                {user.username} 
                <span style={{ marginLeft: '8px', fontSize: '12px' }}>
                  {getRoleIcon(user.role)}
                </span>
              </h4>
              <p>{user.department} • {user.yearOfStudy}</p>
              <p style={{ fontSize: '10px', color: '#999' }}>Roll: {user.rollNumber}</p>
            </div>
            <div 
              className="online-indicator"
              style={{ 
                backgroundColor: user.isOnline ? '#27ae60' : '#95a5a6' 
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
