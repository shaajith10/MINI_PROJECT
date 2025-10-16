import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Chip,
  Paper,
  Container,
  Avatar,
  Divider
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  Help as HelpIcon,
  VideoCall as VideoCallIcon,
  Article as ArticleIcon,
  Download as DownloadIcon,
  Chat as ChatIcon,
  School as SchoolIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  BugReport as BugReportIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Support as SupportIcon,
  Book as BookIcon,
  PlayCircle as PlayCircleIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedAccordion, setExpandedAccordion] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  const helpCategories = [
    {
      title: 'Getting Started',
      icon: <SchoolIcon />,
      articles: [
        {
          question: 'How do I create an account?',
          answer: 'Click on the "Sign Up" button on the login page, fill in your details including department and year of study, and verify your email address.'
        },
        {
          question: 'How do I join chat rooms?',
          answer: 'Navigate to the Chat Rooms section from the main menu, select your department or subject room, and start chatting with your peers.'
        },
        {
          question: 'How do I update my profile?',
          answer: 'Go to your profile settings, click on "Edit Profile", update your information, and save the changes.'
        }
      ]
    },
    {
      title: 'Chat Features',
      icon: <ChatIcon />,
      articles: [
        {
          question: 'How do I send files in chat?',
          answer: 'Click the attachment icon in the chat input, select your file (images, PDFs, videos), and send it to share with others.'
        },
        {
          question: 'How do I use emojis?',
          answer: 'Click the emoji icon in the chat input to open the emoji picker, select your desired emoji, and it will be added to your message.'
        },
        {
          question: 'How do I reply to messages?',
          answer: 'Right-click on any message or use the three-dot menu to select "Reply", then type your response.'
        }
      ]
    },
    {
      title: 'Technical Support',
      icon: <SettingsIcon />,
      articles: [
        {
          question: 'The app is running slowly, what should I do?',
          answer: 'Try refreshing the page, clearing your browser cache, or checking your internet connection. If the issue persists, contact support.'
        },
        {
          question: 'I can\'t see my messages, what\'s wrong?',
          answer: 'Check your internet connection and try refreshing the page. Make sure you\'re logged in and have joined the correct chat room.'
        },
        {
          question: 'How do I report a bug?',
          answer: 'Go to the Contact page, select "Technical Support" as the category, and describe the issue in detail. Our team will investigate and fix it.'
        }
      ]
    },
    {
      title: 'Security & Privacy',
      icon: <SecurityIcon />,
      articles: [
        {
          question: 'Is my data secure?',
          answer: 'Yes, we use industry-standard encryption and security measures to protect your personal information and communications.'
        },
        {
          question: 'Can other users see my private information?',
          answer: 'No, your personal information is only visible to administrators and is not shared with other students or teachers.'
        },
        {
          question: 'How do I change my password?',
          answer: 'Go to Settings > Security, click "Change Password", enter your current password and new password, then confirm the change.'
        }
      ]
    }
  ];

  const quickActions = [
    {
      title: 'Live Chat Support',
      description: 'Get instant help from our support team',
      icon: <ChatIcon />,
      color: 'primary'
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides',
      icon: <PlayCircleIcon />,
      color: 'secondary'
    },
    {
      title: 'Download Manual',
      description: 'Get the complete user manual',
      icon: <DownloadIcon />,
      color: 'success'
    },
    {
      title: 'Report Bug',
      description: 'Report technical issues',
      icon: <BugReportIcon />,
      color: 'error'
    }
  ];

  const resources = [
    {
      title: 'User Manual',
      description: 'Complete guide to using the platform',
      type: 'PDF',
      size: '2.3 MB',
      icon: <DescriptionIcon />
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      type: 'Video',
      size: '15 videos',
      icon: <PlayCircleIcon />
    },
    {
      title: 'FAQ Document',
      description: 'Frequently asked questions',
      type: 'PDF',
      size: '1.1 MB',
      icon: <QuestionAnswerIcon />
    },
    {
      title: 'Security Guide',
      description: 'Best practices for security',
      type: 'PDF',
      size: '1.8 MB',
      icon: <SecurityIcon />
    }
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
          Help & Support Center
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Find answers to your questions and get the help you need
        </Typography>
      </Paper>

      {/* Search Bar */}
      <Card elevation={2} sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <TextField
            fullWidth
            placeholder="Search for help articles, tutorials, or FAQs..."
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
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
        Quick Actions
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {quickActions.map((action, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card elevation={2} sx={{ height: '100%', cursor: 'pointer' }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: `${action.color}.main` }}>
                  {action.icon}
                </Avatar>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {action.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {action.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Help Articles */}
      <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
        Help Articles
      </Typography>
      <Box sx={{ mb: 4 }}>
        {helpCategories.map((category, categoryIndex) => (
          <Accordion
            key={categoryIndex}
            expanded={expandedAccordion === `panel${categoryIndex}`}
            onChange={handleAccordionChange(`panel${categoryIndex}`)}
            sx={{ mb: 2 }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                  {category.icon}
                </Avatar>
                <Typography variant="h6" fontWeight="bold">
                  {category.title}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                {category.articles.map((article, articleIndex) => (
                  <Box key={articleIndex} sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      {article.question}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {article.answer}
                    </Typography>
                    {articleIndex < category.articles.length - 1 && <Divider sx={{ mt: 2 }} />}
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Resources */}
      <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
        Resources & Downloads
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {resources.map((resource, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card elevation={2}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                    {resource.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {resource.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {resource.type} • {resource.size}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {resource.description}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<DownloadIcon />}
                  fullWidth
                >
                  Download
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Contact Support */}
      <Card elevation={2}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: 'primary.main' }}>
            <SupportIcon />
          </Avatar>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Still Need Help?
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Can't find what you're looking for? Our support team is here to help you 24/7.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<ChatIcon />}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                px: 3
              }}
            >
              Start Live Chat
            </Button>
            <Button
              variant="outlined"
              startIcon={<VideoCallIcon />}
            >
              Schedule Call
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Help;


