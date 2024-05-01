import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkoutContext } from "../App";
import ProgressItem from '../components/ProgressItem';
import { motion } from "framer-motion"

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

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.25
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, translateX: -50 },
    show: {
      opacity: 1,
      translateX: 0,
      transition: { duration: .5, delay: .2 }
    }
  };


  return (
    <div className="container mt-4">
      <h1>New Workout</h1>
      <div className="card" onClick={handleSearchClick}>
        <h5 className="card-title text-center p-2">Track new workout +</h5>
      </div>
      <motion.div className="row" variants={containerVariants} initial="hidden" animate="show">
        <h1>Your Workouts</h1>
        {workoutHistory.length > 0 ? workoutHistory.map((workout) => (
          <motion.div key={workout._id} variants={itemVariants}>
            <ProgressItem workout={workout} />
          </motion.div>
        )) : <p>No workout history available.</p>}
      </motion.div>
    </div>
  );
};

export default WorkoutProgress;
