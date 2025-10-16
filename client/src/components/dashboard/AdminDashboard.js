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
  MenuItem,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  AdminPanelSettings as AdminIcon,
  People as PeopleIcon,
  Security as SecurityIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
  Chat as ChatIcon,
  Assignment as AssignmentIcon,
  Event as EventIcon
} from '@mui/icons-material';

const AdminDashboard = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [systemStats] = useState({
    totalUsers: 1250,
    activeUsers: 1180,
    totalDepartments: 10,
    totalMessages: 15420,
    onlineUsers: 45,
    systemUptime: '99.9%'
  });

  const [recentUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@college.edu', department: 'Computer Science', role: 'Student', status: 'active', joinDate: '2024-01-10' },
    { id: 2, name: 'Prof. Smith', email: 'smith@college.edu', department: 'Electronics', role: 'Teacher', status: 'active', joinDate: '2024-01-08' },
    { id: 3, name: 'Sarah Wilson', email: 'sarah@college.edu', department: 'Mechanical', role: 'Student', status: 'inactive', joinDate: '2024-01-05' },
    { id: 4, name: 'Mike Davis', email: 'mike@college.edu', department: 'Civil', role: 'Student', status: 'active', joinDate: '2024-01-03' },
  ]);

  const [systemAlerts] = useState([
    { id: 1, type: 'warning', message: 'High server load detected', time: '2 min ago' },
    { id: 2, type: 'info', message: 'New user registration', time: '15 min ago' },
    { id: 3, type: 'success', message: 'System backup completed', time: '1 hour ago' },
    { id: 4, type: 'error', message: 'Database connection timeout', time: '2 hours ago' },
  ]);

  const [chatLogs] = useState([
    { id: 1, user: 'John Doe', message: 'Hello everyone!', room: 'General', time: '2024-01-15 10:30', flagged: false },
    { id: 2, user: 'Sarah Smith', message: 'Assignment help needed', room: 'Computer Science', time: '2024-01-15 10:25', flagged: false },
    { id: 3, user: 'Mike Wilson', message: 'Inappropriate content', room: 'General', time: '2024-01-15 10:20', flagged: true },
  ]);

  const [departments] = useState([
    { name: 'Computer Science', students: 150, teachers: 8, active: true },
    { name: 'Electronics', students: 120, teachers: 6, active: true },
    { name: 'Mechanical', students: 180, teachers: 10, active: true },
    { name: 'Civil', students: 140, teachers: 7, active: true },
    { name: 'Electrical', students: 110, teachers: 5, active: false },
  ]);

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'suspended':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      case 'info':
        return 'info';
      default:
        return 'default';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'error':
        return <WarningIcon />;
      case 'info':
        return <AnalyticsIcon />;
      default:
        return <AnalyticsIcon />;
    }
  };

  return (
    <Box>
      {/* Welcome Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)', color: 'white' }}>
        <Typography variant="h4" gutterBottom>
          Admin Control Panel 🔧
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Monitor and manage the entire college chat system.
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {/* System Statistics */}
        <Grid item xs={12}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AnalyticsIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">System Statistics</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={6} md={2}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="primary.main">
                      {systemStats.totalUsers}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Users
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} md={2}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="success.main">
                      {systemStats.activeUsers}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Users
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} md={2}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="info.main">
                      {systemStats.totalDepartments}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Departments
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} md={2}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="warning.main">
                      {systemStats.totalMessages}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Messages
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} md={2}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="secondary.main">
                      {systemStats.onlineUsers}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Online Now
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} md={2}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="success.main">
                      {systemStats.systemUptime}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      System Uptime
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* User Management */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">User Management</Typography>
                <Button
                  size="small"
                  startIcon={<AddIcon />}
                  sx={{ ml: 'auto' }}
                  onClick={handleDialogOpen}
                >
                  Add User
                </Button>
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell align="center">Role</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: 'primary.main' }}>
                              {user.name.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight="medium">
                                {user.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {user.email}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Chip label={user.role} color="secondary" size="small" />
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={user.status}
                            color={getStatusColor(user.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            size="small"
                            onClick={(e) => handleMenuOpen(e, user)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
            <CardActions>
              <Button size="small" startIcon={<PeopleIcon />}>
                View All Users
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* System Alerts */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SecurityIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">System Alerts</Typography>
                <Badge badgeContent={systemAlerts.length} color="error" sx={{ ml: 'auto' }} />
              </Box>
              <List>
                {systemAlerts.map((alert) => (
                  <ListItem key={alert.id} divider>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: `${getAlertColor(alert.type)}.main` }}>
                        {getAlertIcon(alert.type)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={alert.message}
                      secondary={
                        <Typography variant="caption" color="text.secondary">
                          {alert.time}
                        </Typography>
                      }
                    />
                    <Chip
                      label={alert.type}
                      color={getAlertColor(alert.type)}
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Department Management */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Department Management</Typography>
              </Box>
              <Stack spacing={2}>
                {departments.map((dept, index) => (
                  <Paper key={index} sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {dept.name}
                      </Typography>
                      <FormControlLabel
                        control={<Switch checked={dept.active} />}
                        label=""
                      />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Chip label={`${dept.students} Students`} color="primary" size="small" />
                      <Chip label={`${dept.teachers} Teachers`} color="secondary" size="small" />
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Chat Monitoring */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ChatIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Chat Monitoring</Typography>
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Message</TableCell>
                      <TableCell align="center">Room</TableCell>
                      <TableCell align="center">Flagged</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {chatLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {log.user}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {log.message}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip label={log.room} color="info" size="small" />
                        </TableCell>
                        <TableCell align="center">
                          {log.flagged ? (
                            <Chip label="Flagged" color="error" size="small" />
                          ) : (
                            <Chip label="Clean" color="success" size="small" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* User Management Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <EditIcon sx={{ mr: 1 }} />
          Edit User
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <BlockIcon sx={{ mr: 1 }} />
          Suspend User
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} />
          Delete User
        </MenuItem>
      </Menu>

      {/* Add User Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Full Name" fullWidth />
            <TextField label="Email" type="email" fullWidth />
            <TextField label="Department" fullWidth />
            <TextField label="Role" select fullWidth>
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Teacher">Teacher</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleDialogClose}>
            Add User
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
        }}
      >
        <SettingsIcon />
      </Fab>
    </Box>
  );
};

export default AdminDashboard;


