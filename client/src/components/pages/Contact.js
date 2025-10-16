import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Alert,
  Snackbar,
  Chip,
  Avatar
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  Send as SendIcon,
  Support as SupportIcon,
  BugReport as BugReportIcon,
  Feedback as FeedbackIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Subject as SubjectIcon,
  Message as MessageIcon
} from '@mui/icons-material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setShowSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '', category: 'general' });
  };

  const contactInfo = [
    {
      icon: <EmailIcon />,
      title: 'Email Support',
      details: ['support@collegechat.edu', 'help@collegechat.edu'],
      description: 'Get help via email within 24 hours'
    },
    {
      icon: <PhoneIcon />,
      title: 'Phone Support',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      description: 'Call us during business hours'
    },
    {
      icon: <LocationIcon />,
      title: 'Office Location',
      details: ['123 University Avenue', 'College Town, CT 12345'],
      description: 'Visit our main campus office'
    },
    {
      icon: <ScheduleIcon />,
      title: 'Business Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM'],
      description: 'We\'re here to help during these hours'
    }
  ];

  const supportCategories = [
    { value: 'general', label: 'General Inquiry', icon: <SupportIcon /> },
    { value: 'technical', label: 'Technical Support', icon: <BugReportIcon /> },
    { value: 'feedback', label: 'Feedback', icon: <FeedbackIcon /> },
    { value: 'feature', label: 'Feature Request', icon: <SchoolIcon /> }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Contact Us
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          We're here to help! Reach out to us for any questions, support, or feedback.
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        {/* Contact Information */}
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Get in Touch
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Have questions about the College Chat Platform? We're here to help you succeed.
          </Typography>

          {contactInfo.map((info, index) => (
            <Card key={index} elevation={1} sx={{ mb: 2 }}>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                    {info.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      {info.title}
                    </Typography>
                    {info.details.map((detail, idx) => (
                      <Typography key={idx} variant="body2" color="text.secondary">
                        {detail}
                      </Typography>
                    ))}
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      {info.description}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}

          {/* Quick Support */}
          <Card elevation={1} sx={{ mt: 3 }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Quick Support
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <SupportIcon />
                  </ListItemIcon>
                  <ListItemText primary="Live Chat Support" secondary="Available 24/7" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText primary="Student Help Center" secondary="Self-service resources" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BugReportIcon />
                  </ListItemIcon>
                  <ListItemText primary="Bug Reports" secondary="Report technical issues" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={8}>
          <Card elevation={2}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Send us a Message
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Fill out the form below and we'll get back to you as soon as possible.
              </Typography>

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: <SubjectIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: <MessageIcon sx={{ mr: 1, color: 'text.secondary', alignSelf: 'flex-start', mt: 1 }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {supportCategories.map((category) => (
                        <Chip
                          key={category.value}
                          icon={category.icon}
                          label={category.label}
                          onClick={() => setFormData(prev => ({ ...prev, category: category.value }))}
                          color={formData.category === category.value ? 'primary' : 'default'}
                          variant={formData.category === category.value ? 'filled' : 'outlined'}
                        />
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<SendIcon />}
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        px: 4,
                        py: 1.5
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* FAQ Section */}
      <Card elevation={2} sx={{ mt: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold" textAlign="center">
            Frequently Asked Questions
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                How do I reset my password?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Click on "Forgot Password" on the login page and follow the instructions sent to your email.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Can I access the platform on mobile?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Yes! Our platform is fully responsive and works seamlessly on all mobile devices.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                How do I join a chat room?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Navigate to the Chat Rooms section and click on any room to join the conversation.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Is my data secure?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Absolutely! We use industry-standard encryption and security measures to protect your data.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success">
          Message sent successfully! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;


