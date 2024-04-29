import React, { useState } from 'react';
import WorkoutItem from './WorkoutItem';
import '../App.css';

interface Exercise {
  _id: string;
  name: string;
  type: string;
  muscle: string;
  difficulty: string;
  instructions: string;
  breakTime: number;
  workoutHistory: Set[];
}

interface Set {
  weight: string;
  reps: string;
}

interface Props {
  exercises: Exercise[];
  isOld: Boolean;
}

const WorkoutList = ({ exercises, isOld }: Props) => {

  const handleWorkoutDone = async () => {
    const exercisesIds = exercises.map(ex => ex._id)
    try {
      const response = await fetch('http://localhost:3000/workout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: "test 1",
          exercises: exercisesIds
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
    } catch (error) {
      console.error('Error marking workout as done:', error);
    }
  };

  return (
    <>
      {exercises.map((exercise) => (
        <React.Fragment key={exercise._id}>
          <WorkoutItem key={exercise._id} exercise={exercise} isOld={isOld} />
          <hr className="my-4" style={{ borderColor: '#FFD700' }} />
        </React.Fragment>
      ))}
      <div className="d-grid gap-2">
        <button onClick={handleWorkoutDone} className="btn btn-custom mt-2">
          Workout Done
        </button>
      </div>
    </>
  );
};

export default WorkoutList;
