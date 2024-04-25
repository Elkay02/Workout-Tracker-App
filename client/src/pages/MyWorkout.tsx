import React, { useState } from 'react';
import '../App.css';
import WorkoutList from '../components/WorkoutList';

const MyWorkout = ({ exercises }) => {

  return (
    <div className="section-header">
      <h2 className="text-center">Workout List</h2>
      {exercises.length > 0 ? (
        <WorkoutList exercises={exercises} />
      ) : (
        <div className="empty-workout-message text-center">
          No exercises added yet. Get moving and add some!
        </div>
      )}
    </div>
  );
};

export default MyWorkout;