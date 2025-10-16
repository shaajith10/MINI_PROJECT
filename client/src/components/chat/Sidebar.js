import React from 'react';
import { motion } from 'framer-motion';
import { FaSignOutAlt, FaComments, FaUsers, FaCog, FaBell } from 'react-icons/fa';

const Sidebar = ({ currentRoom, onRoomChange, onLogout, user }) => {
  const rooms = [
    { id: 'general', name: 'General Discussion', icon: '💬', description: 'General college discussions' },
    { id: 'computer-science', name: 'Computer Science', icon: '💻', description: 'CS students and faculty' },
    { id: 'electronics', name: 'Electronics', icon: '⚡', description: 'Electronics department' },
    { id: 'mechanical', name: 'Mechanical', icon: '🔧', description: 'Mechanical engineering' },
    { id: 'civil', name: 'Civil', icon: '🏗️', description: 'Civil engineering' },
    { id: 'electrical', name: 'Electrical', icon: '🔌', description: 'Electrical engineering' },
    { id: 'it', name: 'Information Technology', icon: '📱', description: 'IT department' },
    { id: 'business', name: 'Business Admin', icon: '📊', description: 'Business administration' },
    { id: 'commerce', name: 'Commerce', icon: '💰', description: 'Commerce department' },
    { id: 'arts', name: 'Arts', icon: '🎨', description: 'Arts and humanities' },
    { id: 'science', name: 'Science', icon: '🔬', description: 'Science department' },
    { id: 'assignments', name: 'Assignments Help', icon: '📝', description: 'Assignment discussions' },
    { id: 'exams', name: 'Exam Preparation', icon: '📚', description: 'Exam tips and study groups' },
    { id: 'events', name: 'College Events', icon: '🎉', description: 'College events and activities' }
  ];

  const getRoomIcon = (roomId) => {
    const room = rooms.find(r => r.id === roomId);
    return room ? room.icon : '💬';
  };

  const getRoomName = (roomId) => {
    const room = rooms.find(r => r.id === roomId);
    return room ? room.name : 'General';
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="user-info">
          <div className="user-avatar">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
            <div className="user-details">
              <h3>{user?.username}</h3>
              <p>{user?.department} • {user?.yearOfStudy}</p>
              <p style={{ fontSize: '10px', opacity: 0.7 }}>Roll: {user?.rollNumber}</p>
            </div>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          <FaSignOutAlt style={{ marginRight: '5px' }} />
          Logout
        </button>
      </div>

      <div className="rooms-section">
        <h4 className="rooms-title">College Departments</h4>
        <ul className="room-list">
          {rooms.map((room) => (
            <li key={room.id} className="room-item">
              <motion.button
                className={`room-button ${currentRoom === room.id ? 'active' : ''}`}
                onClick={() => onRoomChange(room.id)}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="room-icon">{room.icon}</span>
                {room.name}
              </motion.button>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-footer">
        <motion.div
          className="current-room-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '20px', marginRight: '10px' }}>
              {getRoomIcon(currentRoom)}
            </span>
            <div>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>
                {getRoomName(currentRoom)}
              </h4>
              <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>
                Currently active
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Sidebar;
