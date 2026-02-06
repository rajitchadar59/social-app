import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import { Home, Person, Logout } from '@mui/icons-material';

const Navbar = ({ user, handleLogout, onProfileClick, onHomeClick }) => {
  return (
    <AppBar position="sticky" sx={{ bgcolor: '#fff', color: '#1e293b', borderBottom: '1px solid #e2e8f0' }} elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" onClick={onHomeClick} sx={{ cursor: 'pointer', fontWeight: 'bold', color: '#10b981' }}>
          SOCIAL<span style={{color: '#1e293b'}}>APP</span>
        </Typography>
        
        <Box display="flex" gap={1}>
          <Button startIcon={<Home />} onClick={onHomeClick} sx={{ color: '#64748b' }}>Feed</Button>
          <Button startIcon={<Person />} onClick={onProfileClick} sx={{ color: '#64748b' }}>Profile</Button>
          <Button onClick={handleLogout} sx={{ color: '#ef4444' }}><Logout /></Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;