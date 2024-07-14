import React, { useState } from 'react';
import NavBar from './NavBar';
import './App.css';

function App() {
  const [currentTab, setCurrentTab] = useState('home');
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
      const response = await fetch('http://localhost:5000/api/recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setRecommendation(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <NavBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {currentTab === 'home' && (
        <div className="tab-content">
          <h1>Welcome to Starship Fitness</h1>
          <p>Get ready to embark on your fitness journey with us!</p>
        </div>
      )}
      {currentTab === 'form' && (
        <div className="tab-content">
          <h1>Fitness Form</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
            />
            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              value={formData.height}
              onChange={handleChange}
            />
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              value={formData.weight}
              onChange={handleChange}
            />
            <select name="goal" value={formData.goal} onChange={handleChange}>
              <option value="">Select Goal</option>
              <option value="lose">Lose Weight</option>
              <option value="gain">Gain Weight</option>
              <option value="maintain">Maintain Weight</option>
            </select>
            <select name="fitnessLevel" value={formData.fitnessLevel} onChange={handleChange}>
              <option value="">Select Fitness Level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <select name="workoutType" value={formData.workoutType} onChange={handleChange}>
              <option value="">Select Workout Type</option>
              <option value="weights">Weights</option>
              <option value="bodyweight">BodyWeight</option>
              <option value="cardio">Cardio</option>
            </select>
            <button type="submit">Get Recommendation</button>
          </form>
          {recommendation && (
            <div className="recommendation">
              <h2>Recommended Workout:</h2>
              <p>{recommendation}</p>
            </div>
          )}
        </div>
      )}
      {currentTab === 'about' && (
        <div className="tab-content">
          <h1>About Starship Fitness</h1>
          <p>Learn more about our mission and values.</p>
        </div>
      )}
    </div>
  );
}

export default App;
