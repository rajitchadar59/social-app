import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Container,
  Avatar,
  AppBar,
  Toolbar
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import axios from 'axios';

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `https://social-app-il4g.onrender.com/api/auth/${isSignup ? 'register' : 'login'}`;

    try {
      const { data } = await axios.post(url, formData);

      if (!isSignup) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.user.username);
        window.location.href = '/';
      } else {
        alert('Registration Successful! Now Login.');
        setIsSignup(false);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <>
     
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: '#ffffff',
          borderBottom: '1px solid #e5e7eb'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
          <Typography sx={{ fontWeight: 900, color: '#1e293b' }}>
            TASK<span style={{ color: '#00C853' }}>PLANET</span>
          </Typography>

          <Button
            variant="outlined"
            size="small"
            onClick={() => setIsSignup(!isSignup)}
            sx={{
              textTransform: 'none',
              borderRadius: 1.5,
              borderColor: '#e5e7eb',
              color: '#1e293b'
            }}
          >
            {isSignup ? 'Login' : 'Join Now'}
          </Button>
        </Toolbar>
      </AppBar>

      
      <Container maxWidth="xs">
        <Box
          sx={{
            mt: 8,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Paper
            elevation={1}
            sx={{
              width: '100%',
              p: 3,
              borderRadius: 3,
              border: '1px solid #e5e7eb'
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: '#00C853', mx: 'auto', mb: 1 }}>
                <LockOutlined />
              </Avatar>

              <Typography fontWeight={700}>
                {isSignup ? 'Create Account' : 'Welcome Back'}
              </Typography>

              <Typography fontSize="0.8rem" color="text.secondary">
                {isSignup
                  ? 'Create a new account'
                  : 'Login to your account'}
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              {isSignup && (
                <TextField
                  fullWidth
                  size="small"
                  label="Username"
                  margin="normal"
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              )}

              <TextField
                fullWidth
                size="small"
                label="Email"
                margin="normal"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <TextField
                fullWidth
                size="small"
                type="password"
                label="Password"
                margin="normal"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

              <Button
                type="submit"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1,
                  bgcolor: '#00C853',
                  color: '#fff',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': { bgcolor: '#00a444' }
                }}
              >
                {isSignup ? 'Sign Up' : 'Sign In'}
              </Button>

              <Button
                fullWidth
                onClick={() => setIsSignup(!isSignup)}
                sx={{ mt: 1, textTransform: 'none', fontSize: '0.8rem' }}
              >
                {isSignup
                  ? 'Already have an account? Sign In'
                  : "Don't have an account? Sign Up"}
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default Auth;
