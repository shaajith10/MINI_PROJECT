import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Grid,
  Button,
  Chip,
  Avatar,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Badge,
  Paper,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip,
  Fab,
  Alert,
  Snackbar,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Announcement as AnnouncementIcon,
  School as SchoolIcon,
  Event as EventIcon,
  Work as WorkIcon,
  Assignment as AssignmentIcon,
  CalendarToday as CalendarIcon,
  AttachFile as AttachFileIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Pin as PinIcon,
  Notifications as NotificationsIcon,
  ExpandMore as ExpandMoreIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  PriorityHigh as PriorityHighIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  Upload as UploadIcon,
  Image as ImageIcon,
  Description as DescriptionIcon,
  VideoFile as VideoIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';

const Announcements = () => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'normal',
    attachments: []
  });
  const [notifications, setNotifications] = useState([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Sample announcements data
  const [sampleAnnouncements] = useState([
    {
      id: 1,
      title: 'Mid-term Examination Schedule',
      description: 'The mid-term examinations for all courses will be conducted from January 25th to February 5th, 2024. Please check your individual schedules and prepare accordingly.',
      category: 'academic',
      priority: 'high',
      author: { name: 'Dr. Sarah Johnson', role: 'Academic Coordinator', avatar: 'S' },
      date: new Date('2024-01-15'),
      attachments: [
        { name: 'exam_schedule.pdf', type: 'pdf', size: '2.3 MB' },
        { name: 'exam_guidelines.pdf', type: 'pdf', size: '1.8 MB' }
      ],
      views: 245,
      isPinned: true,
      tags: ['Exams', 'Schedule', 'Important']
    },
    {
      id: 2,
      title: 'Tech Fest 2024 Registration Open',
      description: 'Registration for Tech Fest 2024 is now open! Participate in coding competitions, tech talks, and innovation challenges. Last date for registration: February 10th, 2024.',
      category: 'events',
      priority: 'normal',
      author: { name: 'Prof. Michael Chen', role: 'Event Coordinator', avatar: 'M' },
      date: new Date('2024-01-12'),
      attachments: [
        { name: 'tech_fest_brochure.pdf', type: 'pdf', size: '3.2 MB' },
        { name: 'registration_form.pdf', type: 'pdf', size: '1.1 MB' }
      ],
      views: 189,
      isPinned: false,
      tags: ['Tech Fest', 'Registration', 'Competition']
    },
    {
      id: 3,
      title: 'Summer Internship Opportunities',
      description: 'Several companies are offering summer internship opportunities for Computer Science students. Apply through the placement cell before March 15th, 2024.',
      category: 'internship',
      priority: 'normal',
      author: { name: 'Ms. Emily Davis', role: 'Placement Officer', avatar: 'E' },
      date: new Date('2024-01-10'),
      attachments: [
        { name: 'internship_list.pdf', type: 'pdf', size: '4.1 MB' },
        { name: 'application_guidelines.pdf', type: 'pdf', size: '2.2 MB' }
      ],
      views: 156,
      isPinned: false,
      tags: ['Internship', 'Placement', 'Summer']
    },
    {
      id: 4,
      title: 'Library Hours Extended',
      description: 'The library will remain open until 10 PM during the examination period to provide extended study hours for students.',
      category: 'academic',
      priority: 'low',
      author: { name: 'Mr. Robert Wilson', role: 'Librarian', avatar: 'R' },
      date: new Date('2024-01-08'),
      attachments: [],
      views: 98,
      isPinned: false,
      tags: ['Library', 'Study Hours', 'Exams']
    },
    {
      id: 5,
      title: 'Sports Week 2024',
      description: 'Annual Sports Week will be held from February 20th to 25th, 2024. Registration for various sports events is now open.',
      category: 'events',
      priority: 'normal',
      author: { name: 'Coach James Brown', role: 'Sports Coordinator', avatar: 'J' },
      date: new Date('2024-01-05'),
      attachments: [
        { name: 'sports_schedule.pdf', type: 'pdf', size: '1.5 MB' }
      ],
      views: 134,
      isPinned: false,
      tags: ['Sports', 'Events', 'Registration']
    }
  ]);

  const categories = [
    { value: 'all', label: 'All Announcements', icon: <AnnouncementIcon /> },
    { value: 'academic', label: 'Academic Updates', icon: <SchoolIcon /> },
    { value: 'events', label: 'Events & Activities', icon: <EventIcon /> },
    { value: 'internship', label: 'Internship Opportunities', icon: <WorkIcon /> },
    { value: 'assignments', label: 'Assignments', icon: <AssignmentIcon /> }
  ];

  const priorities = {
    high: { color: 'error', icon: <PriorityHighIcon />, label: 'High Priority' },
    normal: { color: 'info', icon: <InfoIcon />, label: 'Normal' },
    low: { color: 'success', icon: <CheckCircleIcon />, label: 'Low Priority' }
  };

  useEffect(() => {
    setAnnouncements(sampleAnnouncements);
    setFilteredAnnouncements(sampleAnnouncements);
  }, []);

  useEffect(() => {
    filterAnnouncements();
  }, [searchQuery, selectedCategory, announcements]);

  const filterAnnouncements = () => {
    let filtered = announcements;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(announcement => announcement.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(announcement =>
        announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        announcement.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        announcement.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort by pinned first, then by date
    filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.date) - new Date(a.date);
    });

    setFilteredAnnouncements(filtered);
  };

  const handleCreateAnnouncement = () => {
    const announcement = {
      id: Date.now(),
      ...newAnnouncement,
      author: { name: user.username, role: user.role, avatar: user.username.charAt(0) },
      date: new Date(),
      views: 0,
      isPinned: false,
      tags: []
    };

    setAnnouncements(prev => [announcement, ...prev]);
    setNewAnnouncement({ title: '', description: '', category: '', priority: 'normal', attachments: [] });
    setShowCreateDialog(false);

    // Show notification
    setNotifications(prev => [...prev, {
      id: Date.now(),
      message: 'New announcement created successfully!',
      type: 'success'
    }]);
  };

  const handleViewAnnouncement = (announcement) => {
    setSelectedAnnouncement(announcement);
    setOpenDialog(true);
    
    // Increment view count
    setAnnouncements(prev => prev.map(a => 
      a.id === announcement.id ? { ...a, views: a.views + 1 } : a
    ));
  };

  const handlePinAnnouncement = (announcementId) => {
    setAnnouncements(prev => prev.map(a => 
      a.id === announcementId ? { ...a, isPinned: !a.isPinned } : a
    ));
  };

  const handleDeleteAnnouncement = (announcementId) => {
    setAnnouncements(prev => prev.filter(a => a.id !== announcementId));
    setOpenDialog(false);
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <DescriptionIcon color="error" />;
      case 'image':
        return <ImageIcon color="primary" />;
      case 'video':
        return <VideoIcon color="secondary" />;
      default:
        return <AttachFileIcon />;
    }
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.icon : <AnnouncementIcon />;
  };

  const getCategoryColor = (category) => {
    const colors = {
      academic: 'primary',
      events: 'secondary',
      internship: 'success',
      assignments: 'warning'
    };
    return colors[category] || 'default';
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Paper elevation={2} sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              📢 College Announcements
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Stay updated with the latest news and important information
            </Typography>
          </Box>
          {(user?.role === 'Teacher' || user?.role === 'Admin') && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setShowCreateDialog(true)}
              sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
            >
              Create Announcement
            </Button>
          )}
        </Box>
      </Paper>

      {/* Filters and Search */}
      <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {category.icon}
                      <Typography sx={{ ml: 1 }}>{category.label}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Announcements Grid */}
      <Grid container spacing={3}>
        {filteredAnnouncements.map((announcement) => (
          <Grid item xs={12} md={6} lg={4} key={announcement.id}>
            <Card 
              elevation={announcement.isPinned ? 4 : 2}
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: announcement.isPinned ? '2px solid #ff9800' : 'none',
                position: 'relative'
              }}
            >
              {announcement.isPinned && (
                <Chip
                  icon={<PinIcon />}
                  label="Pinned"
                  color="warning"
                  size="small"
                  sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
                />
              )}
              
              <CardContent sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2, bgcolor: `${getCategoryColor(announcement.category)}.main` }}>
                    {getCategoryIcon(announcement.category)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {announcement.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {format(announcement.date, 'MMM dd, yyyy')}
                    </Typography>
                  </Box>
                  <Chip
                    icon={priorities[announcement.priority].icon}
                    label={priorities[announcement.priority].label}
                    color={priorities[announcement.priority].color}
                    size="small"
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {announcement.description.length > 100 
                    ? `${announcement.description.substring(0, 100)}...`
                    : announcement.description
                  }
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                  {announcement.tags.map((tag, index) => (
                    <Chip key={index} label={tag} size="small" variant="outlined" />
                  ))}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: 'primary.main' }}>
                      {announcement.author.avatar}
                    </Avatar>
                    <Typography variant="caption" color="text.secondary">
                      {announcement.author.name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <VisibilityIcon sx={{ fontSize: 16 }} />
                    <Typography variant="caption" color="text.secondary">
                      {announcement.views}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>

              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button
                  size="small"
                  onClick={() => handleViewAnnouncement(announcement)}
                >
                  Read More
                </Button>
                {(user?.role === 'Teacher' || user?.role === 'Admin') && (
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handlePinAnnouncement(announcement.id)}
                    >
                      <PinIcon />
                    </IconButton>
                    <IconButton size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Announcement Detail Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedAnnouncement && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ mr: 2, bgcolor: `${getCategoryColor(selectedAnnouncement.category)}.main` }}>
                    {getCategoryIcon(selectedAnnouncement.category)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{selectedAnnouncement.title}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {format(selectedAnnouncement.date, 'MMMM dd, yyyy')}
                    </Typography>
                  </Box>
                </Box>
                <IconButton onClick={() => setOpenDialog(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" paragraph>
                  {selectedAnnouncement.description}
                </Typography>
              </Box>

              {selectedAnnouncement.attachments.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Attachments
                  </Typography>
                  <List>
                    {selectedAnnouncement.attachments.map((file, index) => (
                      <ListItem key={index}>
                        <ListItemAvatar>
                          {getFileIcon(file.type)}
                        </ListItemAvatar>
                        <ListItemText
                          primary={file.name}
                          secondary={file.size}
                        />
                        <ListItemSecondaryAction>
                          <IconButton>
                            <DownloadIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {selectedAnnouncement.tags.map((tag, index) => (
                  <Chip key={index} label={tag} size="small" />
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                    {selectedAnnouncement.author.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2">
                      {selectedAnnouncement.author.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {selectedAnnouncement.author.role}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <VisibilityIcon sx={{ mr: 1 }} />
                    <Typography variant="caption">
                      {selectedAnnouncement.views} views
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* Create Announcement Dialog */}
      <Dialog
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create New Announcement</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Title"
              value={newAnnouncement.title}
              onChange={(e) => setNewAnnouncement(prev => ({ ...prev, title: e.target.value }))}
            />
            
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={newAnnouncement.description}
              onChange={(e) => setNewAnnouncement(prev => ({ ...prev, description: e.target.value }))}
            />
            
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={newAnnouncement.category}
                onChange={(e) => setNewAnnouncement(prev => ({ ...prev, category: e.target.value }))}
                label="Category"
              >
                {categories.slice(1).map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {category.icon}
                      <Typography sx={{ ml: 1 }}>{category.label}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={newAnnouncement.priority}
                onChange={(e) => setNewAnnouncement(prev => ({ ...prev, priority: e.target.value }))}
                label="Priority"
              >
                <MenuItem value="low">Low Priority</MenuItem>
                <MenuItem value="normal">Normal</MenuItem>
                <MenuItem value="high">High Priority</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCreateDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateAnnouncement}>
            Create Announcement
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notifications */}
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={6000}
          onClose={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
        >
          <Alert severity={notification.type}>
            {notification.message}
          </Alert>
        </Snackbar>
      ))}

      {/* Floating Action Button */}
      {(user?.role === 'Teacher' || user?.role === 'Admin') && (
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
          onClick={() => setShowCreateDialog(true)}
        >
          <AddIcon />
        </Fab>
      )}
    </Box>
  );
};

export default Announcements;


