import React, { useState, useEffect } from 'react';
import { Container, TextField, MenuItem, Button, Box, Typography, Card, CardContent } from '@mui/material';
import './App.css';
import Footer from './Footer';
import Gym from './Gym.jpg';
import Feature1 from './feature-1.jpg';
import Feature2 from './feature-2.jpg';
import Feature3 from './feature-3.jpg';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import LandingPage from './LandingPage';

const tabsData = [
  {
    id: 0,
    label: 'Weight Training',
    image: Gym,
    content: 'Build up those muscles! Strengthen bones, improve balance and prevent injuries. This type of strength training can be done with free weights or weight machines.',
  },
  {
    id: 1,
    label: 'Body Weight',
    image: Feature1,
    content: 'Utilize your body weight to enhance your strength, flexibility, and endurance. Ideal for all fitness levels and can be done anywhere with minimal equipment.',
  },
  {
    id: 2,
    label: 'Cardio',
    image: Feature2,
    content: 'Improve your cardiovascular health, burn calories, and increase your stamina with various cardio exercises. Perfect for maintaining a healthy heart and weight.',
  },
  {
    id: 3,
    label: 'Schedule Builder',
    image: Feature3,
    content: '',
  },
  {
    id: 4,
    label: 'BMI Calculator',
    image: '',
    content: '',
  },
];

const generateDetailedWorkoutSchedule = (age, experienceLevel, workoutType, workoutDays) => {
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

  const workoutPlans = {
    beginner: {
      weight: [
        { day: 'Day 1', exercises: [{ name: 'Squats', sets: 3, reps: 12 }, { name: 'Bench Press', sets: 3, reps: 10 }, { name: 'Deadlift', sets: 3, reps: 8 }] },
        { day: 'Day 2', exercises: [{ name: 'Overhead Press', sets: 3, reps: 10 }, { name: 'Barbell Row', sets: 3, reps: 12 }, { name: 'Bicep Curls', sets: 3, reps: 15 }] },
        { day: 'Day 3', exercises: [{ name: 'Lunges', sets: 3, reps: 12 }, { name: 'Tricep Dips', sets: 3, reps: 15 }, { name: 'Leg Press', sets: 3, reps: 10 }] },
        { day: 'Day 4', exercises: [{ name: 'Squats', sets: 3, reps: 12 }, { name: 'Bench Press', sets: 3, reps: 10 }, { name: 'Deadlift', sets: 3, reps: 8 }] },
        { day: 'Day 5', exercises: [{ name: 'Overhead Press', sets: 3, reps: 10 }, { name: 'Barbell Row', sets: 3, reps: 12 }, { name: 'Bicep Curls', sets: 3, reps: 15 }] },
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
        { day: 'Day 6', exercises: [{ name: 'Rest' }] }, // Rest day
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
        { day: 'Day 7', exercises: [{ name: 'Rest' }] }, // Rest day
      ],
    },
  };

  const ageCategory = ageCategories.find(category => age >= category.min && age <= category.max);

  const workoutPlan = workoutPlans[experienceLevel][workoutType];

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

const calculateBMI = (height, weight) => {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

const calculateCaloricNeeds = (weight, goal) => {
  let caloricIntake;
  if (goal === 'lose') {
    caloricIntake = weight * 22 - 500; // Rough estimate for weight loss
  } else if (goal === 'maintain') {
    caloricIntake = weight * 22; // Rough estimate for maintenance
  } else if (goal === 'gain') {
    caloricIntake = weight * 22 + 500; // Rough estimate for weight gain
  }
  return caloricIntake;
};

function App() {
  const [currentTab, setCurrentTab] = useState(0);
  const [formData, setFormData] = useState({
    age: '',
    fitnessLevel: '',
    goal: '',
    daysAvailable: '',
    email: '',
    password: '',
  });
  const [bmiFormData, setBmiFormData] = useState({
    height: '',
    weight: '',
    goal: '',
  });
  const [schedule, setSchedule] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState('');
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [bmiResult, setBmiResult] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBmiChange = (e) => {
    setBmiFormData({ ...bmiFormData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
      setUser(auth.currentUser);
      setLoginError('');
    } catch (error) {
      console.error('Error signing up:', error);
      setLoginError('Sign-up failed. Please try again.');
    }
  };

  const handleLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
      setUser(auth.currentUser);
      setLoginError('');
    } catch (error) {
      setLoginError('Invalid credentials');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { age, fitnessLevel, goal, daysAvailable } = formData;

    try {
      const newSchedule = generateDetailedWorkoutSchedule(age, fitnessLevel, goal, daysAvailable);
      setSchedule(newSchedule.detailedWorkoutSchedule);
      setShowScheduleDialog(true); // Show the dialog after generating the schedule
    } catch (error) {
      console.error('Error generating schedule:', error);
    }
  };

  const handleBmiSubmit = (e) => {
    e.preventDefault();
    const { height, weight, goal } = bmiFormData;

    const bmi = calculateBMI(parseFloat(height), parseFloat(weight));
    const caloricIntake = calculateCaloricNeeds(parseFloat(weight), goal);

    setBmiResult({
      bmi: bmi.toFixed(2),
      caloricIntake: caloricIntake.toFixed(0)
    });
  };

  const handleCloseDialog = () => {
    setShowScheduleDialog(false);
  };

  if (!isLoggedIn) {
    return <LandingPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="App">
      <header>
        <h1>Starship Fitness</h1>
        <nav>
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <button onClick={() => setCurrentTab('login')}>Login</button>
              <button onClick={() => setCurrentTab('signup')}>Sign Up</button>
            </>
          )}
        </nav>
      </header>
      <ul className="tabs">
        {tabsData.map((tab) => (
          <li
            key={tab.id}
            className={currentTab === tab.id ? 'active' : ''}
            data-id={tab.id}
            onClick={() => setCurrentTab(tab.id)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
      <div className="contents">
        {tabsData.map((tab) => (
          <div
            key={tab.id}
            className={`box ${currentTab === tab.id ? 'show' : 'hide'}`}
            data-content={tab.id}
          >
            {currentTab === 3 && tab.id === 3 ? (
              <Box className="tab-content form-container">
                <Typography variant="h4" gutterBottom>Schedule Builder</Typography>
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
                    InputLabelProps={{
                      style: { color: 'var(--form-text-color)' }, // Update label color
                    }}
                    InputProps={{
                      style: { color: 'var(--form-text-color)' }, // Update input text color
                    }}
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
                    InputLabelProps={{
                      style: { color: 'var(--form-text-color)' }, // Update label color
                    }}
                    InputProps={{
                      style: { color: 'var(--form-text-color)' }, // Update input text color
                    }}
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
                    InputLabelProps={{
                      style: { color: 'var(--form-text-color)' }, // Update label color
                    }}
                    InputProps={{
                      style: { color: 'var(--form-text-color)' }, // Update input text color
                    }}
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
                    InputLabelProps={{
                      style: { color: 'var(--form-text-color)' }, // Update label color
                    }}
                    InputProps={{
                      style: { color: 'var(--form-text-color)' }, // Update input text color
                    }}
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
                  <div className="schedule-container">
                    <Typography variant="h4" gutterBottom style={{ color: 'var(--accent-color)' }}>
                      Your Workout Schedule
                    </Typography>
                    {schedule.map((day, index) => (
                      <Card key={index} sx={{ mb: 2 }}>
                        <CardContent>
                          <Typography variant="h6" color="var(--accent-color)">{day.day}</Typography>
                          {day.exercises.map((exercise, idx) => (
                            <Typography key={idx} variant="body1">
                              {exercise.name} - {exercise.sets ? `${exercise.sets} sets, ${exercise.reps} reps` : `${exercise.duration}`}
                            </Typography>
                          ))}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </Box>
            ) : currentTab === 4 && tab.id === 4 ? (
              <Box className="tab-content form-container">
                <Typography variant="h4" gutterBottom>BMI Calculator</Typography>
                <form id="bmi-form" onSubmit={handleBmiSubmit}>
                  <TextField
                    label="Height (in cm)"
                    name="height"
                    value={bmiFormData.height}
                    onChange={handleBmiChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    type="number"
                    InputLabelProps={{
                      style: { color: 'var(--form-text-color)' }, // Update label color
                    }}
                    InputProps={{
                      style: { color: 'var(--form-text-color)' }, // Update input text color
                    }}
                  />
                  <TextField
                    label="Weight (in kg)"
                    name="weight"
                    value={bmiFormData.weight}
                    onChange={handleBmiChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    type="number"
                    InputLabelProps={{
                      style: { color: 'var(--form-text-color)' }, // Update label color
                    }}
                    InputProps={{
                      style: { color: 'var(--form-text-color)' }, // Update input text color
                    }}
                  />
                  <TextField
                    select
                    label="Goal"
                    name="goal"
                    value={bmiFormData.goal}
                    onChange={handleBmiChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      style: { color: 'var(--form-text-color)' }, // Update label color
                    }}
                    InputProps={{
                      style: { color: 'var(--form-text-color)' }, // Update input text color
                    }}
                  >
                    <MenuItem value="lose">Lose 1 lb a week</MenuItem>
                    <MenuItem value="maintain">Maintain weight</MenuItem>
                    <MenuItem value="gain">Gain weight</MenuItem>
                  </TextField>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Calculate
                  </Button>
                </form>
                {bmiResult && (
                  <div id="bmi-result" className="bmi-result">
                    <Typography variant="h6" style={{ color: 'black' }}>Your BMI is: {bmiResult.bmi}</Typography>
                    <Typography variant="h6" style={{ color: 'black' }}>To achieve your goal, you should consume approximately {bmiResult.caloricIntake} calories per day.</Typography>
                  </div>
                )}
              </Box>
            ) : (
              <>
                <img src={tab.image} alt={tab.label} className="feature-image" />
                <div>
                  <Typography variant="h3" style={{ color: 'var(--text-color)' }}>{tab.label}</Typography>
                  <Typography variant="body1" style={{ color: 'var(--text-color)' }}>{tab.content}</Typography>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
