import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Container, TextField, MenuItem, Button, Box, Typography, Toolbar, Card, CardContent } from '@mui/material';
import { FitnessCenter, DirectionsRun, Group } from '@mui/icons-material';
import './App.css';

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
    const { age, fitnessLevel, goal, daysAvailable } = formData;

    const muscleGain = [
      "Day 1: Chest and Triceps\n\nBench Press: 4 sets of 6-8 reps\nIncline Dumbbell Press: 3 sets of 8-10 reps\nCable Flyes: 3 sets of 12-15 reps\nTricep Dips: 3 sets of 8-10 reps\nOverhead Tricep Extension: 3 sets of 10-12 reps",
      "Day 2: Back and Biceps\n\nDeadlifts: 4 sets of 6-8 reps\nPull-Ups: 3 sets of 8-10 reps\nBent Over Rows: 3 sets of 8-10 reps\nBarbell Curls: 3 sets of 8-10 reps\nHammer Curls: 3 sets of 10-12 reps",
      "Day 3: Rest or Active Recovery\n\nLight Cardio: 20-30 minutes\nStretching and Mobility Work",
      "Day 4: Legs and Abs\n\nSquats: 4 sets of 6-8 reps\nLeg Press: 3 sets of 8-10 reps\nCalf Raises: 3 sets of 12-15 reps\nHanging Leg Raises: 3 sets of 10-12 reps\nPlank: 3 sets of 1-2 minutes",
      "Day 5: Shoulders and Traps\n\nOverhead Press: 4 sets of 6-8 reps\nLateral Raises: 3 sets of 10-12 reps\nFront Raises: 3 sets of 10-12 reps\nShrugs: 3 sets of 8-10 reps\nFace Pulls: 3 sets of 12-15 reps",
      "Day 6: Rest or Active Recovery\n\nLight Cardio: 20-30 minutes\nStretching and Mobility Work",
      "Day 7: Rest"
    ];

    const bodyweight = [
      "Day 1: Upper Body Push\n\nPush-Ups: 4 sets of 12-15 reps\nIncline Push-Ups (feet elevated): 3 sets of 10-12 reps\nDiamond Push-Ups: 3 sets of 8-10 reps\nPike Push-Ups: 3 sets of 10-12 reps",
      "Day 2: Upper Body Pull\n\nPull-Ups: 4 sets of 6-8 reps\nAustralian Pull-Ups (if no bar available): 3 sets of 10-12 reps\nReverse Snow Angels: 3 sets of 12-15 reps\nSuperman Pulls: 3 sets of 10-12 reps",
      "Day 3: Core and Stability\n\nPlank: 3 sets of 1-2 minutes\nBicycle Crunches: 3 sets of 20 reps (10 each side)\nLeg Raises: 3 sets of 15-20 reps\nRussian Twists: 3 sets of 20 reps (10 each side)",
      "Day 4: Lower Body and Glutes\n\nSquats: 4 sets of 15-20 reps\nJump Squats: 3 sets of 10-12 reps\nGlute Bridges: 3 sets of 15-20 reps\nSingle-Leg Glute Bridges: 3 sets of 12-15 reps (each leg)",
      "Day 5: Full Body and HIIT\n\nBurpees: 3 sets of 10-12 reps\nMountain Climbers: 3 sets of 1-2 minutes\nJump Lunges: 3 sets of 10-12 reps (each leg)\nHigh Knees: 3 sets of 1-2 minutes",
      "Day 6: Rest or Active Recovery\n\nLight Stretching: 20-30 minutes\nYoga or Pilates: 30 minutes",
      "Day 7: Rest"
    ];

    const cardio = [
      "Day 1: HIIT (High-Intensity Interval Training)\n\nWarm-up: 5-10 minutes of light jogging or brisk walking\nMain Workout:\n30 seconds of sprinting (or high-intensity movement like jumping jacks)\n1 minute of rest or light jogging\nRepeat for 15-20 minutes\nCool-down: 5-10 minutes of stretching or light walking",
      "Day 2: Steady-State Cardio\n\nWarm-up: 5-10 minutes of light jogging or brisk walking\nMain Workout:\n30-45 minutes of steady-state cardio (e.g., jogging, cycling, swimming) at a moderate intensity\nCool-down: 5-10 minutes of stretching or light walking",
      "Day 3: Active Recovery\n\nLight Cardio: 20-30 minutes of low-intensity activity (e.g., walking, gentle cycling)\nStretching and Mobility Work: 10-15 minutes",
      "Day 4: Cardio Circuit\n\nWarm-up: 5-10 minutes of light jogging or brisk walking\nMain Workout:\n1 minute of jumping rope\n1 minute of high knees\n1 minute of butt kicks\n1 minute of mountain climbers\n1 minute of rest or light jogging\nRepeat for 20-30 minutes\nCool-down: 5-10 minutes of stretching or light walking",
      "Day 5: Interval Running\n\nWarm-up: 5-10 minutes of light jogging or brisk walking\nMain Workout:\n1 minute of sprinting\n2 minutes of jogging\nRepeat for 20-30 minutes\nCool-down: 5-10 minutes of stretching or light walking",
      "Day 6: Active Recovery\n\nLight Cardio: 20-30 minutes of low-intensity activity (e.g., walking, gentle cycling)\nStretching and Mobility Work: 10-15 minutes",
      "Day 7: Rest"
    ];

    let workoutPlan = [];

    if (age >= 18 && age <= 25) {
      if (goal === "muscle gain") {
        workoutPlan = muscleGain.slice(0, daysAvailable);
      } else if (goal === "bodyweight") {
        workoutPlan = bodyweight.slice(0, daysAvailable);
      } else if (goal === "cardio") {
        workoutPlan = cardio.slice(0, daysAvailable);
      }
    } else if (age >= 26 && age <= 35) {
      if (goal === "muscle gain") {
        workoutPlan = muscleGain.slice(0, daysAvailable).map((workout) => workout.replace(/45 minutes/, "60 minutes"));
      } else if (goal === "bodyweight") {
        workoutPlan = bodyweight.slice(0, daysAvailable).map((workout) => workout.replace(/30 minutes/, "45 minutes"));
      } else if (goal === "cardio") {
        workoutPlan = cardio.slice(0, daysAvailable).map((workout) => workout.replace(/15-20 minutes/, "20-30 minutes"));
      }
    } else if (age >= 36 && age <= 45) {
      if (goal === "muscle gain") {
        workoutPlan = muscleGain.slice(0, daysAvailable).map((workout) => workout.replace(/60 minutes/, "45 minutes"));
      } else if (goal === "bodyweight") {
        workoutPlan = bodyweight.slice(0, daysAvailable).map((workout) => workout.replace(/45 minutes/, "30 minutes"));
      } else if (goal === "cardio") {
        workoutPlan = cardio.slice(0, daysAvailable).map((workout) => workout.replace(/20-30 minutes/, "15-20 minutes"));
      }
    } else if (age >= 46 && age <= 55) {
      if (goal === "muscle gain") {
        workoutPlan = muscleGain.slice(0, daysAvailable).map((workout) => workout.replace(/60 minutes/, "30 minutes"));
      } else if (goal === "bodyweight") {
        workoutPlan = bodyweight.slice(0, daysAvailable).map((workout) => workout.replace(/45 minutes/, "30 minutes"));
      } else if (goal === "cardio") {
        workoutPlan = cardio.slice(0, daysAvailable).map((workout) => workout.replace(/20-30 minutes/, "15 minutes"));
      }
    } else if (age >= 56 && age <= 65) {
      if (goal === "muscle gain") {
        workoutPlan = muscleGain.slice(0, daysAvailable).map((workout) => workout.replace(/60 minutes/, "20 minutes"));
      } else if (goal === "bodyweight") {
        workoutPlan = bodyweight.slice(0, daysAvailable).map((workout) => workout.replace(/45 minutes/, "20 minutes"));
      } else if (goal === "cardio") {
        workoutPlan = cardio.slice(0, daysAvailable).map((workout) => workout.replace(/20-30 minutes/, "10-15 minutes"));
      }
    } else if (age >= 66) {
      if (goal === "muscle gain") {
        workoutPlan = muscleGain.slice(0, daysAvailable).map((workout) => workout.replace(/60 minutes/, "15 minutes"));
      } else if (goal === "bodyweight") {
        workoutPlan = bodyweight.slice(0, daysAvailable).map((workout) => workout.replace(/45 minutes/, "15 minutes"));
      } else if (goal === "cardio") {
        workoutPlan = cardio.slice(0, daysAvailable).map((workout) => workout.replace(/20-30 minutes/, "10 minutes"));
      }
    } else {
      workoutPlan = ["Invalid age or goal. Please select valid options."];
    }

    return workoutPlan;
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
              <Button variant="contained" color="secondary" size="large" sx={{ mt: 2 }}>Get Started</Button>
            </Box>
            <Box className="home-features" sx={{ display: 'flex', justifyContent: 'space-around', mt: 4 }}>
              <Card sx={{ maxWidth: 345, boxShadow: 3, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
                <CardContent>
                  <FitnessCenter fontSize="large" />
                  <Typography variant="h5" component="div" sx={{ mt: 2 }}>Strength Training</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Customized plans for building muscle and gaining strength.
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 345, boxShadow: 3, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
                <CardContent>
                  <DirectionsRun fontSize="large" />
                  <Typography variant="h5" component="div" sx={{ mt: 2 }}>Cardio Workouts</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    High-intensity and steady-state cardio routines for fat loss.
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 345, boxShadow: 3, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
                <CardContent>
                  <Group fontSize="large" />
                  <Typography variant="h5" component="div" sx={{ mt: 2 }}>Group Classes</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Join our group classes for a fun and engaging workout experience.
                  </Typography>
                </CardContent>
              </Card>
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
    </div>
  );
}

export default App;