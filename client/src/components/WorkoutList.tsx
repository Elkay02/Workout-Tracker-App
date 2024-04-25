import React, { useState } from 'react';
import WorkoutItem from './WorkoutItem';
import '../App.css';

const WorkoutList = ({ exercises }) => {
  const [workoutData, setWorkoutData] = useState({});

  const handleWorkoutDone = async () => {
    try {
      const response = await fetch('http://localhost:3000/exercises/workoutDone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(workoutData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error marking workout as done:', error);
    }
  };

  return (
    <>
      {exercises.map((exercise, index) => (
        <React.Fragment key={exercise._id}>
          <WorkoutItem key={exercise._id} exercise={exercise} setWorkoutData={setWorkoutData} />
          <hr className="my-4" style={{ borderColor: '#FFD700' }} />
        </React.Fragment>
      ))}
      <div className="d-grid gap-2">
        <button onClick={handleWorkoutDone} className="btn btn-custom mt-2">Workout Done</button>
      </div>
    </>

  );
};

export default WorkoutList;