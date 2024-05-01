import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useWorkoutContext } from "../App";
import { motion } from "framer-motion";

const WorkoutLib = () => {

  const { setIsProgress } = useWorkoutContext();

  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const updateHistory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/workout`);
        if (!response.ok) {
          throw new Error('Failed to fetch lift history');
        }
        const data = await response.json()
        console.log('updateHistory ~ data:', data);
        setWorkouts(data.data)
      } catch (error) {
        console.error('Error fetching lift history:', error);
      }
    };

    updateHistory();
  }, []);

  const handleWorkoutClick = (id: string) => {
    navigate(`/workout/${id}`);
  };

    const handleSearchClick = () => {
      setIsProgress(false);
      navigate(`/search`);
    };

    const containerVariants = {
      initial: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.3,
          delayChildren: 0.2 
        }
      }
    };
  
    const itemVariants = {
      initial: { opacity: 0, translateY: -40 },
      visible: { 
        opacity: 1, 
        translateY: 0,
        transition: { duration: 1 } 
      }
    };


  return (
    <div className="container mt-4">
      <h1>New Workout</h1>
      <div className="card" onClick={handleSearchClick}>
          <h5 className="card-title text-center p-2">Create new workout +</h5>
      </div>
      <motion.div className="row" variants={containerVariants} initial="initial" animate="visible">
        <h1>Your Workouts</h1>
        {workouts.map((workout) => (
          <div className="col-md-3 mb-4" key={workout._id}>
            <motion.div className="card" variants={itemVariants} onClick={() => handleWorkoutClick(workout._id)}>
              <div className="card-body" >
                <h5 className="card-title" >{workout.name}</h5>
              </div>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default WorkoutLib