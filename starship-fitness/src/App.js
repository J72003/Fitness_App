import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ fitnessLevel: '', workoutType: '' });
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
    <div className="App">
      <h1>Starship Fitness</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Fitness Level:
          <select name="fitnessLevel" onChange={handleChange}>
            <option value="">Select...</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>
        <label>
          Preferred Workout Type:
          <input type="text" name="workoutType" onChange={handleChange} />
        </label>
        <button type="submit">Get Recommendation</button>
      </form>
      {recommendation && (
        <div>
          <h2>Recommended Workout:</h2>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
}

export default App;
