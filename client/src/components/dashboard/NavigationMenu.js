import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Chip
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Chat as ChatIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Event as EventIcon,
  Analytics as AnalyticsIcon,
  Announcement as AnnouncementIcon,
  AdminPanelSettings as AdminIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

const NavigationMenu = ({ user, onItemClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { id: 'chat', label: 'Chat Rooms', icon: <ChatIcon />, path: '/chat-room' },
    { id: 'announcements', label: 'Announcements', icon: <AnnouncementIcon />, path: '/announcements' },
    { id: 'events', label: 'Events', icon: <EventIcon />, path: '/events' },
  ];

  const teacherMenuItems = [
    { id: 'analytics', label: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
    { id: 'announcements', label: 'Announcements', icon: <AnnouncementIcon />, path: '/announcements' },
  ];

  const adminMenuItems = [
    { id: 'users', label: 'User Management', icon: <AdminIcon />, path: '/users' },
    { id: 'settings', label: 'System Settings', icon: <SecurityIcon />, path: '/settings' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (onItemClick) {
      onItemClick();
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Box sx={{ flex: 1, pt: 2 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              selected={isActive(item.path)}
              onClick={() => handleNavigation(item.path)}
              sx={{
                borderRadius: 2,
                mx: 1,
                mb: 0.5,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}

        {/* Teacher-specific menu items */}
        {user?.role === 'Teacher' && (
          <>
            <Divider sx={{ my: 1, mx: 2 }} />
            <Typography variant="caption" sx={{ px: 3, py: 1, color: 'text.secondary', fontWeight: 600 }}>
              TEACHER TOOLS
            </Typography>
            {teacherMenuItems.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  selected={isActive(item.path)}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    borderRadius: 2,
                    mx: 1,
                    mb: 0.5,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'white',
                      },
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </>
        )}

        {/* Admin-specific menu items */}
        {user?.role === 'Admin' && (
          <>
            <Divider sx={{ my: 1, mx: 2 }} />
            <Typography variant="caption" sx={{ px: 3, py: 1, color: 'text.secondary', fontWeight: 600 }}>
              ADMIN PANEL
            </Typography>
            {adminMenuItems.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  selected={isActive(item.path)}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    borderRadius: 2,
                    mx: 1,
                    mb: 0.5,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'white',
                      },
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </>
        )}
      </List>
    </Box>
  );
};

export default NavigationMenu;
