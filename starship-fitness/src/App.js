import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, MenuItem, Button, Box } from '@mui/material';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    goal: '',
    fitnessLevel: '',
    workoutType: ''
  });
  const [recommendation, setRecommendation] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/recommendation', formData);
      setRecommendation(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ bgcolor: '#cfe8fc', padding: 4, borderRadius: 2, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Starship Fitness
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
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
            label="Height (cm)"
            name="height"
            value={formData.height}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            type="number"
          />
          <TextField
            label="Weight (kg)"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            type="number"
          />
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
            <MenuItem value="lose">Lose Weight</MenuItem>
            <MenuItem value="gain">Gain Weight</MenuItem>
            <MenuItem value="maintain">Maintain Weight</MenuItem>
          </TextField>
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
            label="Preferred Workout Type"
            name="workoutType"
            value={formData.workoutType}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          >
            <MenuItem value="weights">Weights</MenuItem>
            <MenuItem value="bodyweight">BodyWeight</MenuItem>
            <MenuItem value="cardio">Cardio</MenuItem>
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Get Recommendation
          </Button>
        </form>
        {recommendation && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" component="h2">
              Recommended Workout:
            </Typography>
            <Typography>{recommendation}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default App;
