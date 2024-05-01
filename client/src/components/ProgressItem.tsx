import React, { useState } from 'react';

interface Workout {
  _id: string;
  name: string;
  history: {
    date: Date;
    weight: number;
    reps: number;
  }[];
}

const ProgressItem = ({ workout }: { workout: Workout }) => {

  const [newProgress, setNewProgress] = useState(false);
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');


  const handleSubmit = async (name: string) => {
    try {
      const response = await fetch(`http://localhost:3000/progress`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
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
    <div key={workout._id} className="p-4 m-2 text-center card">
      <h2>{workout.name}</h2>
      {workout.history.map((day) => (
        <>
          <hr/>
          <p>
            <b>Date:{" "}</b>
            {day.date
              ? new Date(day.date).toLocaleDateString()
              : "No date"}
          </p>
          <p><b>Weight:</b> {day.weight} kg</p>
          <p><b>Reps:</b> {day.reps}</p>

        </>
      ))}

      {!newProgress ? (<button onClick={() => setNewProgress(true)}>Add New Progress</button>) : (
        <>
          <h3>{new Date(Date.now()).toDateString()}</h3>
          <form onSubmit={() => handleSubmit(workout.name)}>

            <input
              type="number"
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Weight"
              required
            />

            <input
              type="number"
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
  );


};

export default ProgressItem;
