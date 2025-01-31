require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1); // Exit process if unable to connect to the database
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Define a Mongoose 
const recommendationSchema = new mongoose.Schema({
  fitnessLevel: String,
  workoutType: String,
  recommendation: String,
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

// Route to handle workout recommendations
app.post('/api/recommendation', async (req, res) => {
  try {
    const { fitnessLevel, workoutType } = req.body;
    let recommendationText;

    if (fitnessLevel === 'beginner') {
      recommendationText = 'Light workouts like walking and stretching.';
    } else if (fitnessLevel === 'intermediate') {
      recommendationText = 'Moderate workouts like jogging and basic strength training.';
    } else if (fitnessLevel === 'advanced') {
      recommendationText = 'Intense workouts like HIIT and heavy lifting.';
    } else {
      recommendationText = 'Please select a valid fitness level.';
    }

    // Save the recommendation to the database
    const recommendation = new Recommendation({
      fitnessLevel,
      workoutType,
      recommendation: recommendationText,
    });

    await recommendation.save();
    res.json(recommendationText);
  } catch (error) {
    console.error('Error handling recommendation:', error);
    res.status(500).json({ error: 'Failed to save recommendation' });
  }
});

// Route to fetch all recommendations from the database
app.get('/api/recommendations', async (req, res) => {
  try {
    const recommendations = await Recommendation.find();
    res.json(recommendations);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
