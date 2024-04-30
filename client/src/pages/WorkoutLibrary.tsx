import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useWorkoutContext } from "../App";

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


  return (
    <div className="container mt-4"> {/* Bootstrap container class */}
      <h1>New Workout</h1>
      <div className="card" onClick={handleSearchClick}>

          <h5 className="card-title text-center p-2">Create new workout +</h5>
      </div>
      <div className="row">
        <h1>Your Workouts</h1>
        {workouts.map((workout: any) => (
          <div className="col-md-3 mb-4" key={workout._id}> {/* 4-column grid for medium devices */}
            <div className="card">
              <div className="card-body" onClick={() => handleWorkoutClick(workout._id)}>
                <h5 className="card-title">{workout.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkoutLib