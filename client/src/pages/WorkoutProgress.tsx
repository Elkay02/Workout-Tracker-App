import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkoutContext } from "../App";
import ProgressItem from '../components/ProgressItem';

interface Workout {
  _id: string;
  name: string;
  history: {
    date: Date;
    weight: number;
    reps: number;
  }[];
}

const WorkoutProgress = () => {
  const { setIsProgress } = useWorkoutContext();
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkoutHistory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/progress`);
        if (!response.ok) {
          throw new Error('Failed to fetch Workout History');
        }
        const data = await response.json();
        console.log('Update History Data: ', data);

        if (Array.isArray(data.data)) {
          setWorkoutHistory(data.data);
        } else {
          console.error('Expected data array, received:', data.data);
          setWorkoutHistory([]);
        }
      } catch (error) {
        console.error('Failed to fetch workout history', error);
        setWorkoutHistory([]);
      }
    };

    fetchWorkoutHistory();
  }, []);

  const handleSearchClick = () => {
    setIsProgress(true);
    navigate(`/search`);
  };


  return (
    <div className="container mt-4">
      <h1>New Workout</h1>
      <div className="card" onClick={handleSearchClick}>
        <h5 className="card-title text-center p-2">Track new workout +</h5>
      </div>
      <div className="row">
        <h1>Your Workouts</h1>
        {workoutHistory.length > 0 ? workoutHistory.map((workout: Workout) => (

          <ProgressItem workout={workout} />
        )) : <p>No workout history available.</p>}
      </div>
    </div>
  );
};

export default WorkoutProgress;
