import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkoutContext } from "../App";

const WorkoutProgress = () => {
  const { setIsProgress } = useWorkoutContext();
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [newProgress, setNewProgress] = useState(false);
  console.log("🚀 ~ WorkoutProgress ~ newProgress:", newProgress)
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');

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

  const handleSubmit = async () => {
     try {
       const response = await fetch(`http://localhost:3000/progress`, {
         method: "PUT",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           date: new Date(Date.now()),
           weight: weight,
           reps: reps,
         }),
       });
       if (!response.ok) {
         throw new Error("Failed to fetch lift history");
       }
       setNewProgress(false)
     } catch (error) {
       console.error("Error fetching lift history:", error);
     }
  };

  

  return (
    <div className="container mt-4">
      <h1>New Workout</h1>
      <div className="card" onClick={handleSearchClick}>
        <h5 className="card-title text-center p-2">Track new workout +</h5>
      </div>
      <div className="row">
        <h1>Your Workouts</h1>
        {workoutHistory.length > 0 ? workoutHistory.map((workout) => {
          
          return (
            <div key={workout._id} className="mb-4 text-center card">
              <h1>{workout.name}</h1>
              {workout.history.map((day) => (
                <>
                  <p>
                    Date:{" "}
                    {day.date
                      ? new Date(day.date).toLocaleDateString()
                      : "No date"}
                  </p>
                  <p>Weight: {day.weight} kg</p>
                  <p>Reps: {day.reps}</p>
                </>
              ))}
              
              {!newProgress ? <button onClick={setNewProgress(true)}>Add New Progress</button> : (
                <>
                  <h3>{new Date(Date.now()).toDateString()}</h3>
                  <form onSubmit={handleSubmit}>
                    
                  <input
                    type="text"
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Weight"
                    required
                  />

                  <input
                    type="text"
                    onChange={(e) => setReps(e.target.value)}
                    placeholder="Reps"
                    required
                    className="workout-input-spaces"
                    />

                    <button type="submit">submit</button>
                    </form>
                </>
              )}
            </div>
          );}) : <p>No workout history available.</p>}
      </div>
    </div>
  );
};

export default WorkoutProgress;
