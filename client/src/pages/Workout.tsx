import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import WorkoutList from '../components/WorkoutList';

const OldWorkout = () => {
  const { id } = useParams();

  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(`http://localhost:3000/workout/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch exercises');
        }
        const data = await response.json();
        setExercises(data.data.exercises);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, [id]);

  return (
    <div className="section-header">
      <h2 className="text-center">Let's Workout!</h2>
      <WorkoutList exercises={exercises} isOld={true} />
    </div>
  );
};

export default OldWorkout;
