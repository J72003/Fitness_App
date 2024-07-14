const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/recommendation', (req, res) => {
  const { fitnessLevel, workoutType } = req.body;
  let recommendation;

  if (fitnessLevel === 'beginner') {
    recommendation = 'Light workouts like walking and stretching.';
  } else if (fitnessLevel === 'intermediate') {
    recommendation = 'Moderate workouts like jogging and basic strength training.';
  } else if (fitnessLevel === 'advanced') {
    recommendation = 'Intense workouts like HIIT and heavy lifting.';
  } else {
    recommendation = 'Please select a valid fitness level.';
  }

  res.json(recommendation);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
