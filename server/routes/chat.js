const express = require('express');
const Message = require('../models/Message');
const User = require('../models/User');

const router = express.Router();

// Get messages for a room
router.get('/messages/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;
    const { page = 1, limit = 50 } = req.query;

    const messages = await Message.find({ roomId })
      .populate('sender', 'username avatar department')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.json(messages.reverse());
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get online users
router.get('/users/online', async (req, res) => {
  try {
    const onlineUsers = await User.find({ isOnline: true })
      .select('username avatar department yearOfStudy rollNumber role lastSeen');
    
    res.json(onlineUsers);
  } catch (error) {
    console.error('Get online users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
      .select('username avatar department yearOfStudy rollNumber role isOnline lastSeen')
      .sort({ department: 1, yearOfStudy: 1, username: 1 });
    
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save message
router.post('/messages', async (req, res) => {
  try {
    const { content, roomId, messageType = 'text' } = req.body;
    const senderId = req.user.userId;

    const message = new Message({
      sender: senderId,
      content,
      roomId,
      messageType
    });

    await message.save();
    await message.populate('sender', 'username avatar department');

    res.status(201).json(message);
  } catch (error) {
    console.error('Save message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user online status
router.put('/users/status', async (req, res) => {
  try {
    const { isOnline } = req.body;
    const userId = req.user.userId;

    await User.findByIdAndUpdate(userId, {
      isOnline,
      lastSeen: new Date()
    });

    res.json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
