import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Chip,
  Badge,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Tooltip,
  CircularProgress,
  Alert,
  Snackbar,
  InputAdornment,
  Fab,
  Drawer,
  AppBar,
  Toolbar,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  EmojiEmotions as EmojiIcon,
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
  Pin as PinIcon,
  Reply as ReplyIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Add as AddIcon,
  Group as GroupIcon,
  School as SchoolIcon,
  Event as EventIcon,
  Assignment as AssignmentIcon,
  VideoCall as VideoCallIcon,
  Phone as PhoneIcon,
  Settings as SettingsIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  OnlinePrediction as OnlineIcon,
  OfflineBolt as OfflineIcon,
  Chat as ChatIcon   // <-- ADDED THIS LINE
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useSocket } from '../../contexts/SocketContext';
import EmojiPicker from './EmojiPicker';
import FileUploadDialog from './FileUploadDialog';
import { format } from 'date-fns';
import axios from 'axios';

const ChatRoom = () => {
  const { user } = useAuth();
  const { socket } = useSocket();
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // State management
  const [selectedRoom, setSelectedRoom] = useState('general');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [typingUsers, setTypingUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [pinnedMessages, setPinnedMessages] = useState([]);
  const [showPinnedMessages, setShowPinnedMessages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Chat rooms data - Academic Focus
  const chatRooms = [
    { id: 'general', name: 'General Discussion', icon: '💬', members: 45, unread: 2 },
    { id: 'timetable', name: 'Timetable & Schedule', icon: '📅', members: 28, unread: 0 },
    { id: 'assignments', name: 'Assignments & Projects', icon: '📝', members: 67, unread: 5 },
    { id: 'lecture-videos', name: 'Lecture Videos', icon: '🎥', members: 89, unread: 3 },
    { id: 'exams', name: 'Exam Preparation', icon: '📚', members: 89, unread: 3 },
    { id: 'events', name: 'College Events', icon: '🎉', members: 156, unread: 1 },
  ];

  // Sample messages data
  const [sampleMessages] = useState([
    {
      id: 1,
      sender: { id: 'prof1', name: 'Prof. Davis', avatar: 'P', role: 'Teacher' },
      content: 'Welcome to our Computer Science chat! Feel free to ask questions about assignments.',
      timestamp: new Date(Date.now() - 3600000),
      type: 'text',
      readBy: ['user1', 'user2'],
      reactions: { '👍': ['user1', 'user2'], '❤️': ['user3'] },
      isPinned: true
    },
    {
      id: 2,
      sender: { id: 'user1', name: 'John Doe', avatar: 'J', role: 'Student' },
      content: 'Thank you Professor! I have a question about the data structures assignment.',
      timestamp: new Date(Date.now() - 3000000),
      type: 'text',
      readBy: ['prof1', 'user2'],
      reactions: {},
      replyTo: null
    },
    {
      id: 3,
      sender: { id: 'user2', name: 'Sarah Smith', avatar: 'S', role: 'Student' },
      content: 'assignment_guidelines.pdf',
      timestamp: new Date(Date.now() - 2400000),
      type: 'file',
      fileName: 'assignment_guidelines.pdf',
      fileSize: '2.3 MB',
      fileType: 'pdf',
      readBy: ['prof1', 'user1'],
      reactions: { '📄': ['user1'] }
    },
    {
      id: 4,
      sender: { id: 'prof1', name: 'Prof. Davis', avatar: 'P', role: 'Teacher' },
      content: 'Here are the assignment guidelines. Please review them carefully.',
      timestamp: new Date(Date.now() - 1800000),
      type: 'text',
      readBy: ['user1', 'user2'],
      reactions: { '👍': ['user1', 'user2', 'user3'] },
      replyTo: 3
    }
  ]);

  useEffect(() => {
    setMessages(sampleMessages);
    setPinnedMessages(sampleMessages.filter(msg => msg.isPinned));
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on('receive-message', (messageData) => {
        setMessages(prev => [...prev, messageData]);
      });

      socket.on('user-typing', (data) => {
        if (data.userId !== user?.id) {
          setTypingUsers(prev => {
            const filtered = prev.filter(u => u.userId !== data.userId);
            return [...filtered, data];
          });
        }
      });

      socket.on('user-stopped-typing', (data) => {
        setTypingUsers(prev => prev.filter(u => u.userId !== data.userId));
      });

      return () => {
        socket.off('receive-message');
        socket.off('user-typing');
        socket.off('user-stopped-typing');
      };
    }
  }, [socket, user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !socket) return;

    const messageData = {
      id: Date.now(),
      sender: {
        id: user.id,
        name: user.username,
        avatar: user.username.charAt(0),
        role: user.role
      },
      content: newMessage.trim(),
      timestamp: new Date(),
      type: 'text',
      readBy: [user.id],
      reactions: {},
      replyTo: replyTo
    };

    // Add message to local state
    setMessages(prev => [...prev, messageData]);
    setNewMessage('');
    setReplyTo(null);

    // Send via socket
    socket.emit('send-message', {
      ...messageData,
      roomId: selectedRoom
    });

    // Save to database
    try {
      await axios.post('/api/chat/messages', {
        content: messageData.content,
        roomId: selectedRoom,
        replyTo: replyTo
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);

    if (socket) {
      socket.emit('user-typing', {
        userId: user.id,
        username: user.username,
        roomId: selectedRoom
      });

      setTimeout(() => {
        socket.emit('user-stopped-typing', {
          userId: user.id,
          roomId: selectedRoom
        });
      }, 1000);
    }
  };

  const handleFileUpload = (file) => {
    // Handle file upload completion
    console.log('File uploaded:', file);
    setShowFileUpload(false);
  };

  const handleEmojiClick = (emoji) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleMessageAction = (action, message) => {
    setSelectedMessage(message);
    setAnchorEl(null);

    switch (action) {
      case 'reply':
        setReplyTo(message.id);
        break;
      case 'pin':
        setPinnedMessages(prev => [...prev, message]);
        break;
      case 'edit':
        // Handle edit
        break;
      case 'delete':
        // Handle delete
        break;
      default:
        break;
    }
  };

  const handleReaction = (messageId, emoji) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = { ...msg.reactions };
        if (reactions[emoji]) {
          if (reactions[emoji].includes(user.id)) {
            reactions[emoji] = reactions[emoji].filter(id => id !== user.id);
            if (reactions[emoji].length === 0) {
              delete reactions[emoji];
            }
          } else {
            reactions[emoji] = [...reactions[emoji], user.id];
          }
        } else {
          reactions[emoji] = [user.id];
        }
        return { ...msg, reactions };
      }
      return msg;
    }));
  };

  const getMessageTime = (timestamp) => {
    return format(new Date(timestamp), 'HH:mm');
  };

  const getRoomIcon = (roomId) => {
    const room = chatRooms.find(r => r.id === roomId);
    return room ? room.icon : '💬';
  };

  const getRoomName = (roomId) => {
    const room = chatRooms.find(r => r.id === roomId);
    return room ? room.name : 'General Discussion';
  };

  const isOnline = (userId) => {
    return onlineUsers.some(user => user.id === userId);
  };

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', backgroundColor: '#f5f5f5' }}>
      {/* Enhanced Page Header */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          mb: 3
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ mr: 2, bgcolor: 'rgba(255,255,255,0.2)', width: 60, height: 60 }}>
            <ChatIcon sx={{ fontSize: 30 }} />
          </Avatar>
          <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              💬 Chat Room - Real-time Communication Hub
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Connect, Collaborate, and Communicate
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" sx={{ opacity: 0.8, maxWidth: '800px' }}>
          The Chat Room Page is the heart of our application, facilitating real-time communication between users. 
          Each chat room represents a specific department, subject, or class group. The interface resembles modern 
          messaging platforms, with a chat list on one side and a conversation window on the other.
        </Typography>
      </Paper>

      {/* Main Chat Interface */}
      <Box sx={{ flex: 1, display: 'flex' }}>
      {/* Enhanced Chat List Sidebar */}
      <Paper 
        elevation={4} 
        sx={{ 
          width: 380, 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          borderRadius: 3,
          background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
          border: '1px solid rgba(0,0,0,0.05)'
        }}
      >
        {/* Enhanced Header */}
        <Box sx={{ 
          p: 3, 
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
              <ChatIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold" color="primary">
                Academic Chat Rooms
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Connect with your peers and faculty
              </Typography>
            </Box>
          </Box>
          <TextField
            size="small"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'white'
              }
            }}
          />
        </Box>

        {/* Enhanced Room List */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 1 }}>
          <List>
            {chatRooms.map((room) => (
              <ListItem
                key={room.id}
                button
                selected={selectedRoom === room.id}
                onClick={() => setSelectedRoom(room.id)}
                sx={{
                  borderRadius: 3,
                  mx: 1,
                  mb: 1,
                  py: 2,
                  transition: 'all 0.3s ease',
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                    transform: 'translateY(-2px)',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '& .MuiAvatar-root': {
                      backgroundColor: 'rgba(255,255,255,0.2)',
                    }
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ 
                    bgcolor: selectedRoom === room.id ? 'rgba(255,255,255,0.2)' : 'primary.main',
                    fontSize: '1.2rem',
                    width: 48,
                    height: 48
                  }}>
                    {room.icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" fontWeight="bold">
                      {room.name}
                    </Typography>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <GroupIcon sx={{ fontSize: 14, mr: 0.5 }} />
                      <Typography variant="body2">
                        {room.members} members
                      </Typography>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  {room.unread > 0 && (
                    <Badge 
                      badgeContent={room.unread} 
                      color="error"
                      sx={{
                        '& .MuiBadge-badge': {
                          fontSize: '0.75rem',
                          height: 20,
                          minWidth: 20,
                        }
                      }}
                    >
                      <Box />
                    </Badge>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Enhanced Online Users */}
        <Box sx={{ 
          p: 3, 
          borderTop: '1px solid rgba(0,0,0,0.08)',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <OnlineIcon sx={{ mr: 1, color: 'success.main' }} />
            <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">
              Online Now ({onlineUsers.length})
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {onlineUsers.slice(0, 5).map((user) => (
              <Tooltip key={user.id} title={user.name}>
                <Avatar
                  sx={{ 
                    width: 36, 
                    height: 36, 
                    bgcolor: 'success.main',
                    border: '2px solid white',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      transition: 'transform 0.2s ease'
                    }
                  }}
                >
                  {user.name.charAt(0)}
                </Avatar>
              </Tooltip>
            ))}
            {onlineUsers.length > 5 && (
              <Tooltip title={`${onlineUsers.length - 5} more online`}>
                <Avatar sx={{ 
                  width: 36, 
                  height: 36, 
                  bgcolor: 'grey.300',
                  border: '2px solid white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  +{onlineUsers.length - 5}
                </Avatar>
              </Tooltip>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Main Chat Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Chat Header */}
        <Paper 
          elevation={1} 
          sx={{ 
            p: 2, 
            borderRadius: 0,
            borderBottom: '1px solid #e0e0e0'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: 'transparent', fontSize: '1.5rem', mr: 2 }}>
                {getRoomIcon(selectedRoom)}
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {getRoomName(selectedRoom)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {chatRooms.find(r => r.id === selectedRoom)?.members} members
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton onClick={() => setShowPinnedMessages(true)}>
                <PinIcon />
              </IconButton>
              <IconButton>
                <VideoCallIcon />
              </IconButton>
              <IconButton>
                <PhoneIcon />
              </IconButton>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>

        {/* Messages Area */}
        <Box 
          sx={{ 
            flex: 1, 
            overflow: 'auto', 
            p: 2,
            backgroundColor: '#fafafa'
          }}
        >
          {/* Pinned Messages */}
          {pinnedMessages.length > 0 && (
            <Card sx={{ mb: 2, backgroundColor: '#fff3cd', border: '1px solid #ffeaa7' }}>
              <CardContent sx={{ py: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PinIcon sx={{ fontSize: 16, mr: 1, color: '#f39c12' }} />
                  <Typography variant="subtitle2" fontWeight="bold">
                    Pinned Messages
                  </Typography>
                </Box>
                {pinnedMessages.map((msg) => (
                  <Typography key={msg.id} variant="body2" sx={{ mb: 0.5 }}>
                    <strong>{msg.sender.name}:</strong> {msg.content}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Messages List */}
          {messages.map((message) => (
            <Box key={message.id} sx={{ mb: 2 }}>
              {/* Reply Context */}
              {message.replyTo && (
                <Box sx={{ ml: 4, mb: 1, p: 1, backgroundColor: '#f0f0f0', borderRadius: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Replying to {messages.find(m => m.id === message.replyTo)?.sender.name}
                  </Typography>
                </Box>
              )}

              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                  {message.sender.avatar}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {message.sender.name}
                    </Typography>
                    <Chip 
                      label={message.sender.role} 
                      size="small" 
                      sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                      {getMessageTime(message.timestamp)}
                    </Typography>
                    {isOnline(message.sender.id) && (
                      <OnlineIcon sx={{ fontSize: 12, color: 'success.main', ml: 1 }} />
                    )}
                  </Box>

                  {/* Message Content */}
                  {message.type === 'text' && (
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      {message.content}
                    </Typography>
                  )}

                  {message.type === 'file' && (
                    <Card sx={{ maxWidth: 300, mb: 1 }}>
                      <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AttachFileIcon sx={{ mr: 1 }} />
                          <Box>
                            <Typography variant="subtitle2">{message.fileName}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {message.fileSize}
                            </Typography>
                          </Box>
                          <IconButton sx={{ ml: 'auto' }}>
                            <DownloadIcon />
                          </IconButton>
                        </Box>
                      </CardContent>
                    </Card>
                  )}

                  {/* Message Actions */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* Reactions */}
                    {Object.entries(message.reactions).map(([emoji, users]) => (
                      <Chip
                        key={emoji}
                        label={`${emoji} ${users.length}`}
                        size="small"
                        onClick={() => handleReaction(message.id, emoji)}
                        sx={{ height: 24, fontSize: '0.7rem' }}
                      />
                    ))}

                    {/* Action Buttons */}
                    <IconButton 
                      size="small" 
                      onClick={(e) => {
                        setAnchorEl(e.currentTarget);
                        setSelectedMessage(message);
                      }}
                    >
                      <MoreVertIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}

          {/* Typing Indicator */}
          {typingUsers.length > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ mr: 2, width: 32, height: 32 }}>
                <Typography variant="caption">T</Typography>
              </Avatar>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                  {typingUsers.map(u => u.username).join(', ')} typing...
                </Typography>
                <CircularProgress size={16} />
              </Box>
            </Box>
          )}

          <div ref={messagesEndRef} />
        </Box>

        {/* Message Input */}
        <Paper 
          elevation={2} 
          sx={{ 
            p: 2, 
            borderRadius: 0,
            borderTop: '1px solid #e0e0e0'
          }}
        >
          {/* Reply Context */}
          {replyTo && (
            <Box sx={{ mb: 2, p: 1, backgroundColor: '#f0f0f0', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="caption" color="text.secondary">
                  Replying to {messages.find(m => m.id === replyTo)?.sender.name}
                </Typography>
                <IconButton size="small" onClick={() => setReplyTo(null)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={() => setShowFileUpload(true)}>
              <AttachFileIcon />
            </IconButton>
            <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              <EmojiIcon />
            </IconButton>
            <TextField
              fullWidth
              placeholder="Type a message..."
              value={newMessage}
              onChange={handleTyping}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              multiline
              maxRows={4}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                },
              }}
            />
            <IconButton 
              color="primary" 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Box>
      </Box>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        accept="image/*,application/pdf,video/*"
      />

      {/* Message Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleMessageAction('reply', selectedMessage)}>
          <ReplyIcon sx={{ mr: 1 }} />
          Reply
        </MenuItem>
        <MenuItem onClick={() => handleMessageAction('pin', selectedMessage)}>
          <PinIcon sx={{ mr: 1 }} />
          Pin Message
        </MenuItem>
        <MenuItem onClick={() => handleMessageAction('edit', selectedMessage)}>
          <EditIcon sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleMessageAction('delete', selectedMessage)}>
          <DeleteIcon sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Pinned Messages Dialog */}
      <Dialog
        open={showPinnedMessages}
        onClose={() => setShowPinnedMessages(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PinIcon sx={{ mr: 1 }} />
            Pinned Messages
          </Box>
        </DialogTitle>
        <DialogContent>
          {pinnedMessages.map((message) => (
            <Card key={message.id} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                    {message.sender.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {message.sender.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {getMessageTime(message.timestamp)}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1">{message.content}</Typography>
              </CardContent>
            </Card>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPinnedMessages(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* File Upload Dialog */}
      <FileUploadDialog
        open={showFileUpload}
        onClose={() => setShowFileUpload(false)}
        onUpload={handleFileUpload}
      />

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          onClose={() => setShowEmojiPicker(false)}
        />
      )}

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChatRoom;
