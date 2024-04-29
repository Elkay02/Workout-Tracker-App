import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import NewWorkout from './pages/NewWorkout.tsx';
import Navbar from './components/navbar.tsx';
import './App.css';
import Search from './pages/Search.tsx';
import WorkoutLib from './pages/WorkoutLibrary.tsx';
import OldWorkout from './pages/OldWorkout.tsx';

interface Exercise {
  _id: string;
  name: string;
  type: string;
  muscle: string;
  difficulty: string;
  instructions: string;
}

const App = () => {
  const [workoutList, setWorkoutList] = useState<Exercise[]>([]);

  const handleExerciseAdded = (newExercise: Exercise) => {
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
            <Route path="/newWorkout" element={<NewWorkout exercises={workoutList} />} />
            <Route path="/oldWorkout/:id" element={<OldWorkout />} />
            <Route path="/workouts" element={<WorkoutLib />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App