import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Stack,
  Divider,
  Badge,
  LinearProgress,
  Fab
} from '@mui/material';
import {
  Chat as ChatIcon,
  Assignment as AssignmentIcon,
  Event as EventIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  Group as GroupIcon,
  Notifications as NotificationsIcon,
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import { Client } from "@gradio/client";
const StudentDashboard = ({ user }) => {
  const [rewardPoints, setRewardPoints] = useState();
  const [rollNo, setRollNo] = useState('');
  const [recentMessages] = useState([
    { id: 1, sender: 'Prof. Davis', message: 'Assignment deadline extended to Friday', time: '2 min ago', room: 'Computer Science' },
    { id: 2, sender: 'Sarah', message: 'Anyone free for study group?', time: '15 min ago', room: 'General' },
    { id: 3, sender: 'Mike', message: 'Mid-term exam schedule posted', time: '1 hour ago', room: 'Exams' },
  ]);

  const [assignments] = useState([
    { id: 1, title: 'Data Structures Assignment', subject: 'Computer Science', dueDate: '2024-01-15', status: 'pending', progress: 60 },
    { id: 2, title: 'Database Design Project', subject: 'Computer Science', dueDate: '2024-01-20', status: 'in-progress', progress: 30 },
    { id: 3, title: 'Software Engineering Report', subject: 'Computer Science', dueDate: '2024-01-25', status: 'completed', progress: 100 },
  ]);

  const [onlineFriends] = useState([
    { name: 'Sarah Smith', department: 'Electronics', year: '2nd Year', avatar: 'S' },
    { name: 'Mike Wilson', department: 'Mechanical', year: '4th Year', avatar: 'M' },
    { name: 'Emma Davis', department: 'Computer Science', year: '3rd Year', avatar: 'E' },
  ]);

  const [upcomingEvents] = useState([
    { title: 'Tech Fest 2024', date: '2024-01-20', type: 'Event' },
    { title: 'Mid-term Exams', date: '2024-01-25', type: 'Exam' },
    { title: 'Career Fair', date: '2024-02-01', type: 'Career' },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'warning';
      case 'pending':
        return 'error';
      default:
        return 'default';
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'Event':
        return 'primary';
      case 'Exam':
        return 'error';
      case 'Career':
        return 'success';
      default:
        return 'default';
    }
  };
  const onLoad = async () => {
    const client = await Client.connect("PraneshJs/RewardPointsSite");
    const result = await client.predict("/search_student_1", {
      roll_no: rollNo,
    });

    setRewardPoints(result.data);
  }



  return (
    <Box>
      {/* Welcome Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.username}! 👋
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Ready to continue your academic journey? Check out your latest updates below.
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {/* Recent Messages */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ChatIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Recent Messages</Typography>
                <Badge badgeContent={recentMessages.length} color="primary" sx={{ ml: 'auto' }} />
              </Box>
              <List>
                {recentMessages.map((message) => (
                  <ListItem key={message.id} divider>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {message.sender.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={message.message}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {message.sender} • {message.room}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {message.time}
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" size="small">
                        <ChatIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
            <CardActions>
              <Button size="small" startIcon={<ChatIcon />}>
                View All Messages
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Assignments */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssignmentIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">My Assignments</Typography>
              </Box>
              <Stack spacing={2}>
                {assignments.map((assignment) => (
                  <Paper key={assignment.id} sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {assignment.title}
                      </Typography>
                      <Chip
                        label={assignment.status}
                        color={getStatusColor(assignment.status)}
                        size="small"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {assignment.subject} • Due: {assignment.dueDate}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LinearProgress
                        variant="determinate"
                        value={assignment.progress}
                        sx={{ flexGrow: 1, mr: 1 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {assignment.progress}%
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
            <CardActions>
              <Button size="small" startIcon={<AssignmentIcon />}>
                View All Assignments
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Online Friends */}
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <GroupIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Online Friends</Typography>
                <Badge badgeContent={onlineFriends.length} color="success" sx={{ ml: 'auto' }} />
              </Box>
              <List>
                {onlineFriends.map((friend, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              backgroundColor: 'success.main',
                              border: '2px solid white',
                            }}
                          />
                        }
                      >
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {friend.avatar}
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={friend.name}
                      secondary={`${friend.department} • ${friend.year}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" size="small">
                        <ChatIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Events */}
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EventIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Upcoming Events</Typography>
              </Box>
              <Stack spacing={2}>
                {upcomingEvents.map((event, index) => (
                  <Paper key={index} sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {event.title}
                      </Typography>
                      <Chip
                        label={event.type}
                        color={getEventColor(event.type)}
                        size="small"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                      {event.date}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Quick Stats</Typography>
              </Box>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircleIcon sx={{ color: 'success.main', mr: 1 }} />
                    <Typography variant="body2">Completed Assignments</Typography>
                  </Box>
                  <Typography variant="h6" color="success.main">12</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ScheduleIcon sx={{ color: 'warning.main', mr: 1 }} />
                    <Typography variant="body2">Pending Assignments</Typography>
                  </Box>
                  <Typography variant="h6" color="warning.main">3</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SchoolIcon sx={{ color: 'info.main', mr: 1 }} />
                    <Typography variant="body2">Active Courses</Typography>
                  </Box>
                  <Typography variant="h6" color="info.main">6</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>



      <div className="form-group">
        <label className="form-label">
          Enter your roll number to get reward points
        </label>
        <input
          type="email"
          name="email"
          value={rollNo}
          onChange={(event) => setRollNo(event.target.value)}
          className="form-input"
          placeholder="Enter your Roll Number"
          required
        />
        <button onClick={() => onLoad()}>Get Details</button>
      </div>
      <div
        style={{
          backgroundColor: "#1e1e1e",
          color: "#00ff88",
          fontFamily: "Courier New, monospace",
          padding: "20px",
          borderRadius: "10px",
          whiteSpace: "pre-wrap",
          overflowX: "auto",
        }}
      >
        {rewardPoints}
      </div>
      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <UploadIcon />
      </Fab>
    </Box>
  );
};

export default StudentDashboard;


