const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Message = require('./models/Message');
const { sampleUsers, sampleMessages } = require('./sampleData');
require('dotenv').config();

const populateDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/departmental-chat');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Message.deleteMany({});
    console.log('Cleared existing data');

    // Create sample users
    for (const userData of sampleUsers) {
      const user = new User(userData);
      await user.save();
      console.log(`Created user: ${userData.username}`);
    }

    // Create sample messages
    for (const messageData of sampleMessages) {
      // Find sender by username
      const sender = await User.findOne({ username: messageData.sender });
      if (sender) {
        const message = new Message({
          sender: sender._id,
          content: messageData.content,
          roomId: messageData.roomId
        });
        await message.save();
        console.log(`Created message: ${messageData.content.substring(0, 30)}...`);
      }
    }

    console.log('Database populated successfully!');
    console.log('\nSample users created:');
    console.log('- john_doe (CS 3rd Year) - password123');
    console.log('- sarah_smith (Electronics 2nd Year) - password123');
    console.log('- mike_wilson (Mechanical 4th Year) - password123');
    console.log('- prof_davis (CS Teacher) - password123');
    console.log('- admin_college (Admin) - password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error populating database:', error);
    process.exit(1);
  }
};

populateDatabase();




