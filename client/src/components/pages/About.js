import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container
} from '@mui/material';
import {
  School as SchoolIcon,
  People as PeopleIcon,
  Chat as ChatIcon,
  Assignment as AssignmentIcon,
  Event as EventIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  CloudUpload as CloudUploadIcon,
  Notifications as NotificationsIcon,
  Group as GroupIcon,
  TrendingUp as TrendingUpIcon,
  Support as SupportIcon
} from '@mui/icons-material';

const About = () => {
  const features = [
    {
      icon: <ChatIcon />,
      title: 'Real-time Communication',
      description: 'Instant messaging with Socket.io technology for seamless real-time communication between students, teachers, and administrators.'
    },
    {
      icon: <AssignmentIcon />,
      title: 'Assignment Management',
      description: 'Streamlined assignment submission, tracking, and collaboration tools for enhanced academic productivity.'
    },
    {
      icon: <EventIcon />,
      title: 'Event Coordination',
      description: 'Organize and manage college events, announcements, and activities with our comprehensive event management system.'
    },
    {
      icon: <SecurityIcon />,
      title: 'Secure Platform',
      description: 'Advanced security measures including JWT authentication, role-based access control, and data encryption.'
    },
    {
      icon: <SpeedIcon />,
      title: 'High Performance',
      description: 'Optimized for speed and reliability with modern technologies including React, Express.js, and MongoDB.'
    },
    {
      icon: <CloudUploadIcon />,
      title: 'File Sharing',
      description: 'Share documents, images, videos, and other files seamlessly with built-in file upload and management capabilities.'
    }
  ];

  const stats = [
    { number: '1000+', label: 'Active Users', icon: <PeopleIcon /> },
    { number: '50+', label: 'Chat Rooms', icon: <ChatIcon /> },
    { number: '500+', label: 'Daily Messages', icon: <NotificationsIcon /> },
    { number: '99.9%', label: 'Uptime', icon: <TrendingUpIcon /> }
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Project Lead',
      department: 'Computer Science',
      avatar: 'S'
    },
    {
      name: 'Prof. Michael Chen',
      role: 'Technical Director',
      department: 'Information Technology',
      avatar: 'M'
    },
    {
      name: 'Ms. Emily Davis',
      role: 'UI/UX Designer',
      department: 'Design',
      avatar: 'E'
    },
    {
      name: 'Mr. Robert Wilson',
      role: 'Backend Developer',
      department: 'Computer Science',
      avatar: 'R'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Paper
        elevation={3}
        sx={{
          p: 6,
          mb: 4,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Typography variant="h3" gutterBottom fontWeight="bold">
          About College Chat Platform
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: '800px', mx: 'auto' }}>
          A comprehensive digital communication platform designed to enhance collaboration, 
          learning, and engagement within educational institutions.
        </Typography>
      </Paper>

      {/* Mission Statement */}
      <Card elevation={2} sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph>
            To revolutionize educational communication by providing a modern, secure, and user-friendly 
            platform that connects students, teachers, and administrators in real-time. We aim to 
            foster collaboration, streamline academic processes, and create an engaging learning environment 
            that adapts to the digital age.
          </Typography>
          <Typography variant="body1">
            Our platform bridges the gap between traditional classroom communication and modern digital 
            collaboration, ensuring that no student misses important information and that all stakeholders 
            can communicate effectively.
          </Typography>
        </CardContent>
      </Card>

      {/* Features Section */}
      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 3, textAlign: 'center' }}>
        Key Features
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card elevation={2} sx={{ height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold">
                    {feature.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Statistics */}
      <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold" textAlign="center">
          Platform Statistics
        </Typography>
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: 'primary.main' }}>
                  {stat.icon}
                </Avatar>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  {stat.number}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Technology Stack */}
      <Card elevation={2} sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
            Technology Stack
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Frontend Technologies
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                <Chip label="React.js" color="primary" />
                <Chip label="Material-UI" color="secondary" />
                <Chip label="Socket.io Client" color="success" />
                <Chip label="Axios" color="info" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Backend Technologies
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                <Chip label="Node.js" color="primary" />
                <Chip label="Express.js" color="secondary" />
                <Chip label="MongoDB" color="success" />
                <Chip label="Socket.io" color="info" />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Team Section */}
      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 3, textAlign: 'center' }}>
        Our Team
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {team.map((member, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card elevation={2}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mx: 'auto',
                    mb: 2,
                    bgcolor: 'primary.main',
                    fontSize: '2rem'
                  }}
                >
                  {member.avatar}
                </Avatar>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="body2" color="primary" gutterBottom>
                  {member.role}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {member.department}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Contact Information */}
      <Card elevation={2}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
            Get in Touch
          </Typography>
          <Typography variant="body1" paragraph>
            Have questions or need support? Our team is here to help you make the most of the College Chat Platform.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
            <Chip
              icon={<SupportIcon />}
              label="Support Center"
              color="primary"
              clickable
            />
            <Chip
              icon={<GroupIcon />}
              label="Community Forum"
              color="secondary"
              clickable
            />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default About;


