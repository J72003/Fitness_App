import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

function LandingPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch (error) {
      setError('Sign-up failed. Please try again.');
    }
  };

  return (
    <Box className="landing-page" sx={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        {isLogin ? 'Login' : 'Sign Up'}
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={isLogin ? handleLogin : handleSignUp}>
        <TextField
          label="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </Button>
      </form>
      <Button
        onClick={() => setIsLogin(!isLogin)}
        color="secondary"
        fullWidth
        sx={{ mt: 2 }}
      >
        {isLogin ? 'Need an account? Sign Up' : 'Have an account? Login'}
      </Button>
    </Box>
  );
}

export default LandingPage;
