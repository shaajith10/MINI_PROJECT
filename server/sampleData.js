// Sample data for College Chat Application
// This file contains example users and messages for demonstration

const sampleUsers = [
  {
    username: "john_doe",
    email: "john.doe@college.edu",
    password: "password123",
    department: "Computer Science",
    yearOfStudy: "3rd Year",
    rollNumber: "CS2021001",
    role: "Student"
  },
  {
    username: "sarah_smith",
    email: "sarah.smith@college.edu",
    password: "password123",
    department: "Electronics",
    yearOfStudy: "2nd Year",
    rollNumber: "EC2022001",
    role: "Student"
  },
  {
    username: "mike_wilson",
    email: "mike.wilson@college.edu",
    password: "password123",
    department: "Mechanical",
    yearOfStudy: "4th Year",
    rollNumber: "ME2020001",
    role: "Student"
  },
  {
    username: "prof_davis",
    email: "prof.davis@college.edu",
    password: "password123",
    department: "Computer Science",
    yearOfStudy: "PhD",
    rollNumber: "CS001",
    role: "Teacher"
  },
  {
    username: "admin_college",
    email: "admin@college.edu",
    password: "password123",
    department: "Computer Science",
    yearOfStudy: "PhD",
    rollNumber: "ADMIN001",
    role: "Admin"
  }
];

const sampleMessages = [
  {
    content: "Welcome to our college chat! Feel free to introduce yourselves.",
    roomId: "general",
    sender: "prof_davis"
  },
  {
    content: "Hi everyone! I'm John from CS 3rd year. Looking forward to connecting with you all!",
    roomId: "general",
    sender: "john_doe"
  },
  {
    content: "Hello! I'm Sarah from Electronics 2nd year. Nice to meet you all!",
    roomId: "general",
    sender: "sarah_smith"
  },
  {
    content: "Anyone working on the Data Structures assignment? Need some help with binary trees.",
    roomId: "computer-science",
    sender: "john_doe"
  },
  {
    content: "I can help! Binary trees are tricky at first. What specific part are you stuck on?",
    roomId: "computer-science",
    sender: "prof_davis"
  },
  {
    content: "Mid-term exams are next week. Good luck everyone! 📚",
    roomId: "exams",
    sender: "admin_college"
  },
  {
    content: "College fest is coming up! Anyone interested in participating in tech events?",
    roomId: "events",
    sender: "mike_wilson"
  }
];

module.exports = { sampleUsers, sampleMessages };




