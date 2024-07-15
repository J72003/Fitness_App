// Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        Starship Fitness
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
        Follow us on social media:
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          Facebook
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ marginLeft: 10 }}>
          Twitter
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ marginLeft: 10 }}>
          Instagram
        </a>
      </Box>
    </Box>
  );
};

export default Footer;