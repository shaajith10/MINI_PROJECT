import React, { useState } from 'react';
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
  Paper,
  Stack,
  Divider,
  Badge,
  LinearProgress,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  Analytics as AnalyticsIcon,
  Upload as UploadIcon,
  Announcement as AnnouncementIcon,
  Group as GroupIcon,
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const TeacherDashboard = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleMenuOpen = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const [classStats] = useState({
    totalStudents: 45,
    activeStudents: 38,
    assignmentsSubmitted: 35,
    averageScore: 85
  });

  const [recentSubmissions] = useState([
    { id: 1, student: 'John Doe', assignment: 'Data Structures Project', submittedAt: '2024-01-15', status: 'submitted', score: null },
    { id: 2, student: 'Sarah Smith', assignment: 'Database Design', submittedAt: '2024-01-14', status: 'graded', score: 92 },
    { id: 3, student: 'Mike Wilson', assignment: 'Software Engineering', submittedAt: '2024-01-13', status: 'graded', score: 88 },
    { id: 4, student: 'Emma Davis', assignment: 'Data Structures Project', submittedAt: '2024-01-12', status: 'submitted', score: null },
  ]);

  const [announcements] = useState([
    { id: 1, title: 'Mid-term Exam Schedule', content: 'Mid-term exams will be held from Jan 25-30', date: '2024-01-10', views: 45 },
    { id: 2, title: 'Assignment Extension', content: 'Data Structures assignment deadline extended', date: '2024-01-08', views: 38 },
    { id: 3, title: 'Lab Session Cancelled', content: 'Tomorrow\'s lab session is cancelled', date: '2024-01-05', views: 42 },
  ]);

  const [studentEngagement] = useState([
    { name: 'John Doe', messages: 25, assignments: 3, lastActive: '2 hours ago' },
    { name: 'Sarah Smith', messages: 18, assignments: 2, lastActive: '1 hour ago' },
    { name: 'Mike Wilson', messages: 32, assignments: 4, lastActive: '30 min ago' },
    { name: 'Emma Davis', messages: 15, assignments: 2, lastActive: '3 hours ago' },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'graded':
        return 'success';
      case 'submitted':
        return 'warning';
      case 'overdue':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      {/* Welcome Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)', color: 'white' }}>
        <Typography variant="h4" gutterBottom>
          Welcome, Prof. {user?.username}! 👨‍🏫
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Manage your classes and track student progress efficiently.
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {/* Class Statistics */}
        <Grid item xs={12} md={8}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AnalyticsIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Class Statistics</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="primary.main">
                      {classStats.totalStudents}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Students
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="success.main">
                      {classStats.activeStudents}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Students
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="warning.main">
                      {classStats.assignmentsSubmitted}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Submissions
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="info.main">
                      {classStats.averageScore}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Average Score
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Stack spacing={2}>
                <Button
                  variant="contained"
                  startIcon={<UploadIcon />}
                  fullWidth
                  sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                >
                  Upload Assignment
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<AnnouncementIcon />}
                  fullWidth
                >
                  Send Announcement
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<GroupIcon />}
                  fullWidth
                >
                  Create Study Group
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<AnalyticsIcon />}
                  fullWidth
                >
                  View Analytics
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Submissions */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssignmentIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Recent Submissions</Typography>
                <Badge badgeContent={recentSubmissions.length} color="primary" sx={{ ml: 'auto' }} />
              </Box>
              <List>
                {recentSubmissions.map((submission) => (
                  <ListItem key={submission.id} divider>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {submission.student.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={submission.student}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {submission.assignment}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Submitted: {submission.submittedAt}
                            {submission.score && ` • Score: ${submission.score}`}
                          </Typography>
                        </Box>
                      }
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        label={submission.status}
                        color={getStatusColor(submission.status)}
                        size="small"
                      />
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, submission)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </CardContent>
            <CardActions>
              <Button size="small" startIcon={<AssignmentIcon />}>
                View All Submissions
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Student Engagement */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Student Engagement</Typography>
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Student</TableCell>
                      <TableCell align="center">Messages</TableCell>
                      <TableCell align="center">Assignments</TableCell>
                      <TableCell align="center">Last Active</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {studentEngagement.map((student, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: 'primary.main' }}>
                              {student.name.charAt(0)}
                            </Avatar>
                            {student.name}
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Chip label={student.messages} color="primary" size="small" />
                        </TableCell>
                        <TableCell align="center">
                          <Chip label={student.assignments} color="secondary" size="small" />
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="caption" color="text.secondary">
                            {student.lastActive}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Announcements */}
        <Grid item xs={12}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AnnouncementIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Recent Announcements</Typography>
                <Button
                  size="small"
                  startIcon={<AnnouncementIcon />}
                  sx={{ ml: 'auto' }}
                >
                  Create New
                </Button>
              </Box>
              <Grid container spacing={2}>
                {announcements.map((announcement) => (
                  <Grid item xs={12} md={4} key={announcement.id}>
                    <Paper sx={{ p: 2, height: '100%' }}>
                      <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                        {announcement.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {announcement.content}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" color="text.secondary">
                          {announcement.date}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <VisibilityIcon sx={{ fontSize: 16 }} />
                          <Typography variant="caption" color="text.secondary">
                            {announcement.views}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <VisibilityIcon sx={{ mr: 1 }} />
          View Submission
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <EditIcon sx={{ mr: 1 }} />
          Grade Assignment
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <DownloadIcon sx={{ mr: 1 }} />
          Download File
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
        }}
      >
        <UploadIcon />
      </Fab>
    </Box>
  );
};

export default TeacherDashboard;


