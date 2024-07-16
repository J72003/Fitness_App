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

  const generateDetailedWorkoutSchedule = (age, experienceLevel, workoutType, workoutDays) => {
    // Define age categories
    const ageCategories = [
      { min: 18, max: 29 },
      { min: 30, max: 39 },
      { min: 40, max: 49 },
      { min: 50, max: 59 },
      { min: 60, max: 69 },
      { min: 70, max: 79 },
      { min: 80, max: 89 },
      { min: 90, max: 99 },
      { min: 100, max: 110 },
    ];

    // Define detailed workout plans
    const workoutPlans = {
      beginner: {
        weight: [
          { day: 'Day 1', exercises: [{ name: 'Squats', sets: 3, reps: 12 }, { name: 'Bench Press', sets: 3, reps: 10 }, { name: 'Deadlift', sets: 3, reps: 8 }] },
          { day: 'Day 2', exercises: [{ name: 'Overhead Press', sets: 3, reps: 10 }, { name: 'Barbell Row', sets: 3, reps: 12 }, { name: 'Bicep Curls', sets: 3, reps: 15 }] },
          { day: 'Day 3', exercises: [{ name: 'Lunges', sets: 3, reps: 12 }, { name: 'Tricep Dips', sets: 3, reps: 15 }, { name: 'Leg Press', sets: 3, reps: 10 }] },
          { day: 'Day 4', exercises: [{ name: 'Squats', sets: 3, reps: 12 }, { name: 'Bench Press', sets: 3, reps: 10 }, { name: 'Deadlift', sets: 3, reps: 8 }] },
          { day: 'Day 5', exercises: [{ name: 'OverheaD Press', sets: 3, reps: 10 }, { name: 'Barbell Row', sets: 3, reps: 12 }, { name: 'Bicep Curls', sets: 3, reps: 15 }] },
          { day: 'Day 6', exercises: [{ name: 'Lunges', sets: 3, reps: 12 }, { name: 'Tricep Dips', sets: 3, reps: 15 }, { name: 'Leg Press', sets: 3, reps: 10 }] },
          { day: 'Day 7', exercises: [{ name: 'Rest' }] }, // Rest day
        ],
        cardio: [
          { day: 'Day 1', exercises: [{ name: 'Running', duration: '30 mins' }, { name: 'Jump Rope', duration: '15 mins' }] },
          { day: 'Day 2', exercises: [{ name: 'Cycling', duration: '45 mins' }, { name: 'High Knees', duration: '10 mins' }] },
          { day: 'Day 3', exercises: [{ name: 'Swimming', duration: '30 mins' }, { name: 'Burpees', duration: '15 mins' }] },
          { day: 'Day 4', exercises: [{ name: 'Running', duration: '30 mins' }, { name: 'Jump Rope', duration: '15 mins' }] },
          { day: 'Day 5', exercises: [{ name: 'Cycling', duration: '45 mins' }, { name: 'High Knees', duration: '10 mins' }] },
          { day: 'Day 6', exercises: [{ name: 'Swimming', duration: '30 mins' }, { name: 'Burpees', duration: '15 mins' }] },
          { day: 'Day 7', exercises: [{ name: 'Rest' }] }, // Rest day
        ],
        bodyweight: [
          { day: 'Day 1', exercises: [{ name: 'Push-ups', sets: 3, reps: 15 }, { name: 'Pull-ups', sets: 3, reps: 10 }, { name: 'Plank', sets: 3, duration: '1 min' }] },
          { day: 'Day 2', exercises: [{ name: 'Bodyweight Squats', sets: 3, reps: 20 }, { name: 'Lunges', sets: 3, reps: 15 }, { name: 'Mountain Climbers', sets: 3, duration: '1 min' }] },
          { day: 'Day 3', exercises: [{ name: 'Burpees', sets: 3, reps: 15 }, { name: 'Tricep Dips', sets: 3, reps: 12 }, { name: 'Sit-ups', sets: 3, reps: 20 }] },
          { day: 'Day 4', exercises: [{ name: 'Push-ups', sets: 3, reps: 15 }, { name: 'Pull-ups', sets: 3, reps: 10 }, { name: 'Plank', sets: 3, duration: '1 min' }] },
          { day: 'Day 5', exercises: [{ name: 'Bodyweight Squats', sets: 3, reps: 20 }, { name: 'Lunges', sets: 3, reps: 15 }, { name: 'Mountain Climbers', sets: 3, duration: '1 min' }] },
          { day: 'Day 6', exercises: [{ name: 'Burpees', sets: 3, reps: 15 }, { name: 'Tricep Dips', sets: 3, reps: 12 }, { name: 'Sit-ups', sets: 3, reps: 20 }] },
          { day: 'Day 7', exercises: [{ name: 'Rest' }] }, // Rest day
        ],
      },
      intermediate: {
        weight: [
          { day: 'Day 1', exercises: [{ name: 'Squats', sets: 4, reps: 8 }, { name: 'Bench Press', sets: 4, reps: 8 }, { name: 'Deadlift', sets: 3, reps: 6 }] },
          { day: 'Day 2', exercises: [{ name: 'Overhead Press', sets: 4, reps: 8 }, { name: 'Barbell Row', sets: 4, reps: 8 }, { name: 'Pull-ups', sets: 3, reps: 10 }] },
          { day: 'Day 3', exercises: [{ name: 'Lunges', sets: 3, reps: 12 }, { name: 'Dumbbell Flyes', sets: 3, reps: 12 }, { name: 'Leg Curl', sets: 3, reps: 12 }] },
          { day: 'Day 4', exercises: [{ name: 'Squats', sets: 4, reps: 8 }, { name: 'Bench Press', sets: 4, reps: 8 }, { name: 'Deadlift', sets: 3, reps: 6 }] },
          { day: 'Day 5', exercises: [{ name: 'Overhead Press', sets: 4, reps: 8 }, { name: 'Barbell Row', sets: 4, reps: 8 }, { name: 'Pull-ups', sets: 3, reps: 10 }] },
          { day: 'Day 6', exercises: [{ name: 'Lunges', sets: 3, reps: 12 }, { name: 'Dumbbell Flyes', sets: 3, reps: 12 }, { name: 'Leg Curl', sets: 3, reps: 12 }] },
          { day: 'Day 7', exercises: [{ name: 'Rest' }] }, // Rest day
        ],
        cardio: [
          { day: 'Day 1', exercises: [{ name: 'Interval Running', duration: '30 mins' }, { name: 'Jump Rope', duration: '15 mins' }] },
          { day: 'Day 2', exercises: [{ name: 'Steady State Cycling', duration: '45 mins' }, { name: 'High Knees', duration: '10 mins' }] },
          { day: 'Day 3', exercises: [{ name: 'Swimming', duration: '30 mins' }, { name: 'Burpees', duration: '15 mins' }] },
          { day: 'Day 4', exercises: [{ name: 'Interval Running', duration: '30 mins' }, { name: 'Jump Rope', duration: '15 mins' }] },
          { day: 'Day 5', exercises: [{ name: 'Steady State Cycling', duration: '45 mins' }, { name: 'High Knees', duration: '10 mins' }] },
          { day: 'Day 6', exercises: [{ name: 'Swimming', duration: '30 mins' }, { name: 'Burpees', duration: '15 mins' }] },
          { day: 'Day 7', exercises: [{ name: 'Rest' }] }, // Rest day
        ],
        bodyweight: [
          { day: 'Day 1', exercises: [{ name: 'Push-ups', sets: 4, reps: 12 }, { name: 'Pull-ups', sets: 4, reps: 8 }, { name: 'Plank', sets: 3, duration: '1 min 30 sec' }] },
          { day: 'Day 2', exercises: [{ name: 'Bodyweight Squats', sets: 4, reps: 15 }, { name: 'Lunges', sets: 4, reps: 12 }, { name: 'Mountain Climbers', sets: 3, duration: '1 min' }] },
          { day: 'Day 3', exercises: [{ name: 'Burpees', sets: 4, reps: 12 }, { name: 'Tricep Dips', sets: 4, reps: 10 }, { name: 'Sit-ups', sets: 4, reps: 15 }] },
          { day: 'Day 4', exercises: [{ name: 'Push-ups', sets: 4, reps: 12 }, { name: 'Pull-ups', sets: 4, reps: 8 }, { name: 'Plank', sets: 3, duration: '1 min 30 sec' }] },
          { day: 'Day 5', exercises: [{ name: 'Bodyweight Squats', sets: 4, reps: 15 }, { name: 'Lunges', sets: 4, reps: 12 }, { name: 'Mountain Climbers', sets: 3, duration: '1 min' }] },
          { day: 'Day 6', exercises: [{ name: 'Burpees', sets: 4, reps: 12 }, { name: 'Tricep Dips', sets: 4, reps: 10 }, { name: 'Sit-ups', sets: 4, reps: 15 }] },
          { day: 'Day 7', exercises: [{ name: 'Rest' }] }, // Rest day
        ],
      },
      advanced: {
        weight: [
          { day: 'Day 1', exercises: [{ name: 'Squats', sets: 5, reps: 5 }, { name: 'Bench Press', sets: 5, reps: 5 }, { name: 'Deadlift', sets: 3, reps: 5 }] },
          { day: 'Day 2', exercises: [{ name: 'Overhead Press', sets: 5, reps: 5 }, { name: 'Barbell Row', sets: 5, reps: 5 }, { name: 'Pull-ups', sets: 4, reps: 6 }] },
          { day: 'Day 3', exercises: [{ name: 'Rest' }] }, // Rest day
          { day: 'Day 4', exercises: [{ name: 'Squats', sets: 5, reps: 5 }, { name: 'Bench Press', sets: 5, reps: 5 }, { name: 'Deadlift', sets: 3, reps: 5 }] },
          { day: 'Day 5', exercises: [{ name: 'Overhead Press', sets: 5, reps: 5 }, { name: 'Barbell Row', sets: 5, reps: 5 }, { name: 'Pull-ups', sets: 4, reps: 6 }] },
          { day: 'Day 6', exercises: [{ name: 'Rest'}] }, // Rest day
          { day: 'Day 7', exercises: [{ name: 'Rest' }] }, // Rest day
        ],
        cardio: [
          { day: 'Day 1', exercises: [{ name: 'HIIT Running', duration: '20 mins' }, { name: 'Jump Rope', duration: '10 mins' }] },
          { day: 'Day 2', exercises: [{ name: 'Steady State Cycling', duration: '60 mins' }, { name: 'High Knees', duration: '10 mins' }] },
          { day: 'Day 3', exercises: [{ name: 'Rest' }] }, // Rest day
          { day: 'Day 4', exercises: [{ name: 'HIIT Running', duration: '20 mins' }, { name: 'Jump Rope', duration: '10 mins' }] },
          { day: 'Day 5', exercises: [{ name: 'Steady State Cycling', duration: '60 mins' }, { name: 'High Knees', duration: '10 mins' }] },
          { day: 'Day 6', exercises: [{ name: 'Rest' }] }, // Rest day
          { day: 'Day 7', exercises: [{ name: 'Rest' }] }, // Rest day
        ],
        bodyweight: [
          { day: 'Day 1', exercises: [{ name: 'Push-ups', sets: 5, reps: 10 }, { name: 'Pull-ups', sets: 5, reps: 6 }, { name: 'Plank', sets: 3, duration: '2 min' }] },
          { day: 'Day 2', exercises: [{ name: 'Bodyweight Squats', sets: 5, reps: 12 }, { name: 'Lunges', sets: 5, reps: 10 }, { name: 'Mountain Climbers', sets: 3, duration: '1 min 30 sec' }] },
          { day: 'Day 3', exercises: [{ name: 'Rest' }] }, // Rest day
          { day: 'Day 4', exercises: [{ name: 'Push-ups', sets: 5, reps: 10 }, { name: 'Pull-ups', sets: 5, reps: 6 }, { name: 'Plank', sets: 3, duration: '2 min' }] },
          { day: 'Day 5', exercises: [{ name: 'Bodyweight Squats', sets: 5, reps: 12 }, { name: 'Lunges', sets: 5, reps: 10 }, { name: 'Mountain Climbers', sets: 3, duration: '1 min 30 sec' }] },
          { day: 'Day 6', exercises: [{ name: 'Rest' }] }, // Rest day
          { day: 'Day 7', exercises: [{ name: 'Rest'}] }, // Rest day
        ],
      },
    };

    // Determine age category
    const ageCategory = ageCategories.find(category => age >= category.min && age <= category.max);

    // Get workout plan based on experience level and workout type
    const workoutPlan = workoutPlans[experienceLevel][workoutType];

    // Generate detailed workout schedule
    let detailedWorkoutSchedule = [];
    for (let i = 0; i < workoutDays; i++) {
      detailedWorkoutSchedule.push(workoutPlan[i % workoutPlan.length]);
    }

    return {
      ageCategory,
      experienceLevel,
      workoutType,
      workoutDays,
      detailedWorkoutSchedule
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { age, fitnessLevel, goal, daysAvailable } = formData;
    const newSchedule = generateDetailedWorkoutSchedule(age, fitnessLevel, goal, daysAvailable);
    setSchedule(newSchedule.detailedWorkoutSchedule);
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
                <MenuItem value="weight">Weight Training</MenuItem>
                <MenuItem value="cardio">Cardio</MenuItem>
                <MenuItem value="bodyweight">Bodyweight</MenuItem>
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
                      <Typography variant="h6">{day.day}</Typography>
                      {day.exercises.map((exercise, idx) => (
                        <Typography key={idx} variant="body1">
                          {exercise.name} - {exercise.sets} sets, {exercise.reps} reps
                        </Typography>
                      ))}
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