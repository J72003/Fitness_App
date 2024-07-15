import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Container, TextField, MenuItem, Button, Box, Typography, Toolbar, Card, CardContent } from '@mui/material';
import { FitnessCenter, DirectionsRun } from '@mui/icons-material';
import './App.css';
import Footer from './Footer'; // Import the Footer component
import Gym from './Gym.jpg';
import Feature1 from './feature-1.jpg';
import Feature2 from './feature-2.jpg';
import Feature3 from './feature-3.jpg';

function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [formData, setFormData] = useState({
    age: '',
    fitnessLevel: '',
    goal: '',
    daysAvailable: '',
  });
  const [schedule, setSchedule] = useState([]);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateWorkoutSchedule = () => {
    // Your existing generateWorkoutSchedule function
    return [
      "Monday: Cardio for 30 minutes",
      "Tuesday: Strength Training",
      "Wednesday: Rest",
      "Thursday: Cardio for 30 minutes",
      "Friday: Strength Training",
      "Saturday: Cardio for 30 minutes",
      "Sunday: Rest"
    ];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSchedule = generateWorkoutSchedule();
    setSchedule(newSchedule);
  };

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Starship Fitness
            </Typography>
          </Toolbar>
        </AppBar>
        <Box className="tabs-container">
          <Tabs value={currentTab} onChange={handleChangeTab} aria-label="nav tabs" centered>
            <Tab label="Home" value="home" />
            <Tab label="Form" value="form" />
            <Tab label="About" value="about" />
          </Tabs>
        </Box>
      </Box>
      <Container>
        {currentTab === 'home' && (
          <Box className="tab-content">
            <Box className="home-banner" sx={{ my: 4, p: 4, textAlign: 'center', borderRadius: 2, background: 'linear-gradient(135deg, #ff6f61, #ffcc5c)', color: 'white' }}>
              <Typography variant="h2" gutterBottom>Welcome to Starship Fitness</Typography>
              <Typography variant="h6" gutterBottom>Embark on your fitness journey with us!</Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{ mt: 2 }}
                onClick={() => setCurrentTab('form')}
              >
                Get Started
              </Button>
            </Box>
            <Box className="home-features" sx={{ display: 'flex', justifyContent: 'space-around', mt: 4, flexWrap: 'wrap' }}>
              {[
                { image: Gym, icon: <FitnessCenter fontSize="large" />, title: "Strength Training", description: "Customized plans for building muscle and gaining strength." },
                { image: Feature1, icon: <DirectionsRun fontSize="large" />, title: "Cardio Workouts", description: "High-intensity and steady-state cardio routines for fat loss." },
                { image: Feature2, title: "BodyWeight Exercises", description: "Beginner Friendly for maintaining and growing muscle." }
              ].map((feature, index) => (
                <Card key={index} sx={{ maxWidth: 345, boxShadow: 3, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' }, m: 2 }}>
                  <CardContent>
                    <img src={feature.image} alt={feature.title} className="feature-image" />
                    {feature.icon}
                    <Typography variant="h5" component="div" sx={{ mt: 2 }}>{feature.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{feature.description}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        )}
        {currentTab === 'form' && (
          <Box className="tab-content form-container">
            <Typography variant="h4" gutterBottom>Fitness Form</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                type="number"
              />
              <TextField
                select
                label="Fitness Level"
                name="fitnessLevel"
                value={formData.fitnessLevel}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              >
                <MenuItem value="beginner">Beginner</MenuItem>
                <MenuItem value="intermediate">Intermediate</MenuItem>
                <MenuItem value="advanced">Advanced</MenuItem>
              </TextField>
              <TextField
                select
                label="Fitness Goal"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              >
                <MenuItem value="muscle gain">Muscle Gain</MenuItem>
                <MenuItem value="bodyweight">Bodyweight</MenuItem>
                <MenuItem value="cardio">Cardio</MenuItem>
              </TextField>
              <TextField
                label="Days Available (1-7)"
                name="daysAvailable"
                value={formData.daysAvailable}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                type="number"
                inputProps={{ min: 1, max: 7 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Generate Schedule
              </Button>
            </form>
            {schedule.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6">Your Personalized Workout Schedule:</Typography>
                {schedule.map((day, index) => (
                  <Card key={index} sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>{day}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        )}
        {currentTab === 'about' && (
          <Box className="tab-content">
            <Typography variant="h4" gutterBottom>About Starship Fitness</Typography>
            <Typography>Learn more about our mission and values.</Typography>
          </Box>
        )}
      </Container>
      <Footer /> {/* Include the Footer component here */}
    </div>
  );
}

export default App;