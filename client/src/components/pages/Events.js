import React, { useState } from 'react';
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
  AccordionDetails,
  LinearProgress,
  CountdownTimer
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Event as EventIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  Notifications as NotificationsIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Close as CloseIcon,
  Upload as UploadIcon,
  Image as ImageIcon,
  VideoLibrary as VideoIcon,
  Description as DescriptionIcon,
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  TrendingUp as TrendingUpIcon,
  Group as GroupIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Sports as SportsIcon,
  MusicNote as MusicIcon,
  Science as ScienceIcon,
  Computer as ComputerIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { format, isAfter, isBefore, addDays } from 'date-fns';

const Events = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    category: '',
    organizer: '',
    agenda: '',
    maxParticipants: '',
    images: []
  });
  const [notifications, setNotifications] = useState([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  // Sample events data
  const [sampleEvents] = useState([
    {
      id: 1,
      title: 'Tech Fest 2024',
      description: 'Annual technology festival showcasing innovative projects, coding competitions, and tech talks from industry experts.',
      date: new Date('2024-02-15'),
      time: '09:00 AM - 06:00 PM',
      venue: 'Main Auditorium',
      category: 'technical',
      organizer: { name: 'Prof. Michael Chen', role: 'Event Coordinator', avatar: 'M' },
      agenda: 'Opening ceremony, project exhibitions, coding competitions, tech talks, networking session',
      maxParticipants: 500,
      currentParticipants: 234,
      images: ['tech_fest_1.jpg', 'tech_fest_2.jpg'],
      status: 'upcoming',
      registrationDeadline: new Date('2024-02-10'),
      tags: ['Technology', 'Competition', 'Innovation']
    },
    {
      id: 2,
      title: 'Cultural Night 2024',
      description: 'A vibrant evening celebrating diverse cultures with performances, food stalls, and cultural exhibitions.',
      date: new Date('2024-01-25'),
      time: '06:00 PM - 11:00 PM',
      venue: 'Cultural Center',
      category: 'cultural',
      organizer: { name: 'Ms. Sarah Johnson', role: 'Cultural Coordinator', avatar: 'S' },
      agenda: 'Cultural performances, food festival, art exhibition, traditional games',
      maxParticipants: 300,
      currentParticipants: 189,
      images: ['cultural_1.jpg'],
      status: 'upcoming',
      registrationDeadline: new Date('2024-01-20'),
      tags: ['Culture', 'Performance', 'Food']
    },
    {
      id: 3,
      title: 'Career Fair 2024',
      description: 'Connect with top companies and explore career opportunities. Resume workshops and mock interviews included.',
      date: new Date('2024-01-20'),
      time: '10:00 AM - 04:00 PM',
      venue: 'Exhibition Hall',
      category: 'career',
      organizer: { name: 'Mr. Robert Wilson', role: 'Placement Officer', avatar: 'R' },
      agenda: 'Company presentations, resume workshops, mock interviews, networking',
      maxParticipants: 400,
      currentParticipants: 400,
      images: ['career_1.jpg', 'career_2.jpg'],
      status: 'ongoing',
      registrationDeadline: new Date('2024-01-15'),
      tags: ['Career', 'Jobs', 'Networking']
    },
    {
      id: 4,
      title: 'Sports Week 2024',
      description: 'Annual sports competition featuring various games and tournaments for students and faculty.',
      date: new Date('2024-01-10'),
      time: '08:00 AM - 06:00 PM',
      venue: 'Sports Complex',
      category: 'sports',
      organizer: { name: 'Coach James Brown', role: 'Sports Coordinator', avatar: 'J' },
      agenda: 'Opening ceremony, various sports competitions, closing ceremony',
      maxParticipants: 200,
      currentParticipants: 156,
      images: ['sports_1.jpg'],
      status: 'past',
      registrationDeadline: new Date('2024-01-05'),
      tags: ['Sports', 'Competition', 'Fitness']
    },
    {
      id: 5,
      title: 'Research Symposium 2024',
      description: 'Showcase of student and faculty research projects with presentations and poster sessions.',
      date: new Date('2024-02-28'),
      time: '09:00 AM - 05:00 PM',
      venue: 'Conference Hall',
      category: 'academic',
      organizer: { name: 'Dr. Emily Davis', role: 'Research Coordinator', avatar: 'E' },
      agenda: 'Keynote speech, research presentations, poster sessions, panel discussion',
      maxParticipants: 150,
      currentParticipants: 89,
      images: ['research_1.jpg'],
      status: 'upcoming',
      registrationDeadline: new Date('2024-02-25'),
      tags: ['Research', 'Academic', 'Presentation']
    }
  ]);

  const categories = [
    { value: 'all', label: 'All Events', icon: <EventIcon /> },
    { value: 'technical', label: 'Technical', icon: <ComputerIcon /> },
    { value: 'cultural', label: 'Cultural', icon: <MusicIcon /> },
    { value: 'sports', label: 'Sports', icon: <SportsIcon /> },
    { value: 'academic', label: 'Academic', icon: <SchoolIcon /> },
    { value: 'career', label: 'Career', icon: <WorkIcon /> }
  ];

  const eventStatuses = {
    upcoming: { color: 'info', label: 'Upcoming' },
    ongoing: { color: 'success', label: 'Ongoing' },
    past: { color: 'default', label: 'Past' }
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.icon : <EventIcon />;
  };

  const getCategoryColor = (category) => {
    const colors = {
      technical: 'primary',
      cultural: 'secondary',
      sports: 'success',
      academic: 'warning',
      career: 'info'
    };
    return colors[category] || 'default';
  };

  const handleCreateEvent = () => {
    const event = {
      id: Date.now(),
      ...newEvent,
      organizer: { name: user.username, role: user.role, avatar: user.username.charAt(0) },
      currentParticipants: 0,
      status: 'upcoming',
      images: [],
      tags: []
    };

    setEvents(prev => [event, ...prev]);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      venue: '',
      category: '',
      organizer: '',
      agenda: '',
      maxParticipants: '',
      images: []
    });
    setShowCreateDialog(false);

    setNotifications(prev => [...prev, {
      id: Date.now(),
      message: 'New event created successfully!',
      type: 'success'
    }]);
  };

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const handleRegisterEvent = (eventId) => {
    if (!registeredEvents.includes(eventId)) {
      setRegisteredEvents(prev => [...prev, eventId]);
      setEvents(prev => prev.map(e => 
        e.id === eventId ? { ...e, currentParticipants: e.currentParticipants + 1 } : e
      ));
      
      setNotifications(prev => [...prev, {
        id: Date.now(),
        message: 'Successfully registered for the event!',
        type: 'success'
      }]);
    }
  };

  const handleBookmarkEvent = (eventId) => {
    // Toggle bookmark functionality
    console.log('Bookmark event:', eventId);
  };

  const filterEvents = () => {
    let filtered = sampleEvents;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by tab (status)
    if (selectedTab === 0) {
      filtered = filtered.filter(event => event.status === 'upcoming');
    } else if (selectedTab === 1) {
      filtered = filtered.filter(event => event.status === 'ongoing');
    } else if (selectedTab === 2) {
      filtered = filtered.filter(event => event.status === 'past');
    }

    setFilteredEvents(filtered);
  };

  React.useEffect(() => {
    setEvents(sampleEvents);
    filterEvents();
  }, []);

  React.useEffect(() => {
    filterEvents();
  }, [searchQuery, selectedCategory, selectedTab, sampleEvents]);

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Paper elevation={2} sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              🎉 College Events
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              The Event Page displays all departmental and college-level events in an organized, interactive way.
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8, mt: 1 }}>
              Stay informed and engaged with academic, cultural, and technical activities happening around campus.
            </Typography>
          </Box>
          {(user?.role === 'Teacher' || user?.role === 'Admin') && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setShowCreateDialog(true)}
              sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
            >
              Create Event
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
              placeholder="Search events..."
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

      {/* Event Status Tabs */}
      <Paper elevation={1} sx={{ mb: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          centered
        >
          <Tab label="Upcoming Events" />
          <Tab label="Ongoing Events" />
          <Tab label="Past Events" />
        </Tabs>
      </Paper>

      {/* Events Grid */}
      <Grid container spacing={3}>
        {filteredEvents.map((event) => (
          <Grid item xs={12} md={6} lg={4} key={event.id}>
            <Card 
              elevation={2}
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              <Chip
                label={eventStatuses[event.status].label}
                color={eventStatuses[event.status].color}
                size="small"
                sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
              />
              
              <CardContent sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2, bgcolor: `${getCategoryColor(event.category)}.main` }}>
                    {getCategoryIcon(event.category)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {event.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {format(event.date, 'MMM dd, yyyy')} • {event.time}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {event.description.length > 100 
                    ? `${event.description.substring(0, 100)}...`
                    : event.description
                  }
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {event.venue}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <GroupIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {event.currentParticipants}/{event.maxParticipants} participants
                  </Typography>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={(event.currentParticipants / event.maxParticipants) * 100}
                  sx={{ mb: 2 }}
                />

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                  {event.tags.map((tag, index) => (
                    <Chip key={index} label={tag} size="small" variant="outlined" />
                  ))}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: 'primary.main' }}>
                      {event.organizer.avatar}
                    </Avatar>
                    <Typography variant="caption" color="text.secondary">
                      {event.organizer.name}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>

              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button
                  size="small"
                  onClick={() => handleViewEvent(event)}
                >
                  View Details
                </Button>
                <Box>
                  <IconButton
                    size="small"
                    onClick={() => handleBookmarkEvent(event.id)}
                  >
                    <BookmarkBorderIcon />
                  </IconButton>
                  {event.status === 'upcoming' && !registeredEvents.includes(event.id) && (
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleRegisterEvent(event.id)}
                      disabled={event.currentParticipants >= event.maxParticipants}
                    >
                      Join
                    </Button>
                  )}
                  {registeredEvents.includes(event.id) && (
                    <Chip label="Registered" color="success" size="small" />
                  )}
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Event Detail Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedEvent && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ mr: 2, bgcolor: `${getCategoryColor(selectedEvent.category)}.main` }}>
                    {getCategoryIcon(selectedEvent.category)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{selectedEvent.title}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {format(selectedEvent.date, 'MMMM dd, yyyy')} • {selectedEvent.time}
                    </Typography>
                  </Box>
                </Box>
                <IconButton onClick={() => setOpenDialog(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            
            <DialogContent>
              <Typography variant="body1" paragraph>
                {selectedEvent.description}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Event Agenda
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedEvent.agenda}
                </Typography>
              </Box>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationIcon sx={{ mr: 1 }} />
                    <Typography variant="body2">{selectedEvent.venue}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <GroupIcon sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      {selectedEvent.currentParticipants}/{selectedEvent.maxParticipants} participants
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {selectedEvent.tags.map((tag, index) => (
                  <Chip key={index} label={tag} size="small" />
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                    {selectedEvent.organizer.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2">
                      {selectedEvent.organizer.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {selectedEvent.organizer.role}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton>
                    <ShareIcon />
                  </IconButton>
                  <IconButton>
                    <DownloadIcon />
                  </IconButton>
                </Box>
              </Box>
            </DialogContent>
            
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Close</Button>
              {selectedEvent.status === 'upcoming' && !registeredEvents.includes(selectedEvent.id) && (
                <Button
                  variant="contained"
                  onClick={() => handleRegisterEvent(selectedEvent.id)}
                  disabled={selectedEvent.currentParticipants >= selectedEvent.maxParticipants}
                >
                  Register for Event
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Create Event Dialog */}
      <Dialog
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create New Event</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
            />
            
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={newEvent.description}
              onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
            />
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Time"
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
            
            <TextField
              fullWidth
              label="Venue"
              value={newEvent.venue}
              onChange={(e) => setNewEvent(prev => ({ ...prev, venue: e.target.value }))}
            />
            
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={newEvent.category}
                onChange={(e) => setNewEvent(prev => ({ ...prev, category: e.target.value }))}
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
            
            <TextField
              fullWidth
              label="Agenda"
              multiline
              rows={2}
              value={newEvent.agenda}
              onChange={(e) => setNewEvent(prev => ({ ...prev, agenda: e.target.value }))}
            />
            
            <TextField
              fullWidth
              label="Maximum Participants"
              type="number"
              value={newEvent.maxParticipants}
              onChange={(e) => setNewEvent(prev => ({ ...prev, maxParticipants: e.target.value }))}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCreateDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateEvent}>
            Create Event
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

export default Events;


