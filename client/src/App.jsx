import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import MyWorkout from './pages/MyWorkout.tsx';
import Navbar from './components/navbar.tsx';
import './App.css';
import Search from './pages/Search.jsx';

const App = () => {
  const [workoutList, setWorkoutList] = useState([]);

  const handleExerciseAdded = (newExercise) => {
    setWorkoutList([...workoutList, newExercise]);
  };

  return (
    <Router>
      <div>
        {/* My navigation bar */}
        <Navbar />

        {/* My main content */}
        <div className="container main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search onExerciseAdded={handleExerciseAdded} />} />
            <Route path="/myworkout" element={<MyWorkout exercises={workoutList} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;