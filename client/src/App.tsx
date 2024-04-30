import React, { createContext, useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Navbar from './components/navbar.tsx';
import './App.css';
import Search from './pages/Search.tsx';
import WorkoutLib from './pages/WorkoutLibrary.tsx';
import WorkoutProgress from './pages/WorkoutProgress.tsx';
import OldWorkout from './pages/Workout.tsx';
import CreateWorkout from './pages/CreateWorkout.tsx';

interface Exercise {
  _id: string;
  name: string;
  type: string;
  muscle: string;
  difficulty: string;
  instructions: string;
}

interface WorkoutContextType {
  workoutList: Exercise[];
  handleExerciseAdded: (newExercise: Exercise) => void;
  setWorkoutList: React.Dispatch<React.SetStateAction<Exercise[]>>;
  setIsProgress: React.Dispatch<React.SetStateAction<boolean>>;
  isProgress: Boolean;
}

const WorkoutContext = createContext<WorkoutContextType>({
  workoutList: [],
  handleExerciseAdded: () => {},
  setWorkoutList: () => {},
  setIsProgress: () => {},
  isProgress: false,
});

const App = () => {
  const [workoutList, setWorkoutList] = useState<Exercise[]>([]);
  const [isProgress, setIsProgress] = useState(false);

  const handleExerciseAdded = (newExercise: Exercise) => {
    setWorkoutList([...workoutList, newExercise]);
  };

  return (
    <WorkoutContext.Provider
      value={{
        workoutList,
        handleExerciseAdded,
        setWorkoutList,
        setIsProgress,
        isProgress
      }}
    >
      <Router>
        <div>
          {/* My navigation bar */}
          <Navbar />

          {/* My main content */}
          <div className="container main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route
                path="/createWorkout"
                element={<CreateWorkout exercises={workoutList} />}
              />
              <Route path="/workout/:id" element={<OldWorkout />} />
              <Route path="/workoutLib" element={<WorkoutLib />} />
              <Route path="/workoutProgress" element={<WorkoutProgress />} />
            </Routes>
          </div>
        </div>
      </Router>
    </WorkoutContext.Provider>
  );
};

const useWorkoutContext = () => useContext(WorkoutContext);

export { useWorkoutContext, App as default };