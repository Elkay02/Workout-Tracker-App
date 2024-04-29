import React, { useState, useEffect } from 'react';
import Timer from './Timer';

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
  exercise: Exercise;
}

const DislpayWorkoutItem = ({ exercise }: Props) => {

  const [sets, setSets] = useState<Set[]>(exercise.workoutHistory);
  const [exercising, setExercising] = useState(false);
  const [startTime, setStartTime] = useState(false);
  const [finished, setFinished] = useState(false);
  const [myIndex, setMyIndex] = useState(0);

  useEffect(() => {
    setFinished(myIndex >= sets.length)
  }, [myIndex])


  return (
    <div className="workout-item card card-custom mb-3">
      <div className="card-body">
        <h5 className="card-title">{exercise.name}</h5>
        <p className="card-text">Type: {exercise.type}</p>
        <p className="card-text">Muscle: {exercise.muscle}</p>
        <p className="card-text">Difficulty: {exercise.difficulty}</p>
        <p className="card-text">Instructions: {exercise.instructions}</p>
        {!exercising && (
          <div>
            <h6>Break Time: <span>{exercise.breakTime}</span></h6><h2>Sets:</h2>
            {sets.map((set, index) => (
              <p key={index}>Set: {index + 1}, Weight: {set.weight}, Reps: {set.reps} </p>
            ))}
            <button onClick={() => { setExercising(true) }}>Start Exercise</button>
          </div>
        )}
        {exercising && sets[myIndex] && (
          <div>
            <h6>Set {myIndex + 1}</h6>
            <h6>Weight: {sets[myIndex].weight} Kg</h6>
            <h6>Reps: {sets[myIndex].reps}</h6>
            <button
              onClick={(e) => {
                setStartTime(true);
              }}
            >
              Finished Set
            </button>
            {startTime && (
              <Timer
                seconds={exercise.breakTime}
                setIndex={setMyIndex}
                setStart={setStartTime}
              />
            )}
          </div>
        )}
        {finished && (
          <div>
            <h1>You're Done!!</h1>
            <h2>Lift History:</h2>
            {sets && sets.map((set, index) => (
              <p>Set: {index + 1}, Weight: {set.weight}, Reps: {set.reps} </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DislpayWorkoutItem;
