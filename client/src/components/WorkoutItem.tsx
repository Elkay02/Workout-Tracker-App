import React, { useState, useEffect } from 'react';
import Timer from './Timer';

interface Exercise {
  _id: string;
  name: string;
  type: string;
  muscle: string;
  difficulty: string;
  instructions: string;
}

interface Props {
  exercise: Exercise;
  setWorkoutData: React.Dispatch<React.SetStateAction<{ [key: string]: { weight: string; reps: string }[] }>>;
}

const WorkoutItem = ({ exercise, setWorkoutData }: Props) => {
  const [sets, setSets] = useState<{ weight: string; reps: string }[]>([]);
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerDuration, setTimerDuration] = useState(60);
  const [liftHistory, setLiftHistory] = useState<any>(null);
  const [showWorkoutHistory, setShowWorkoutHistory] = useState(false);

  useEffect(() => {
    if (exercise && sets.length) {
      setWorkoutData((data) => ({
        ...data,
        [String(exercise._id)]: sets,
      }));
    }
  }, [exercise, sets, setWorkoutData]);

  useEffect(() => {
    const fetchLiftHistory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/exercises/${exercise._id}/lift-history`);
        if (!response.ok) {
          throw new Error('Failed to fetch lift history');
        }
        const data = await response.json();
        setLiftHistory(data.data);
      } catch (error) {
        console.error('Error fetching lift history:', error);
      }
    };

    fetchLiftHistory();
  }, [exercise._id]);

  const handleAddSet = () => {
    const newSet = { weight: '', reps: '' };
    setSets([...sets, newSet]);
    setTimerStarted(false);
  };

  const handleInputChange = (index: number, key: string, value: string) => {
    const updatedSets = [...sets];
    updatedSets[index][key] = value;
    setSets(updatedSets);
    if (value !== '' && sets[index].weight !== '' && sets[index].reps !== '') {
      setTimerStarted(true);
    }
  };

  const handleTimerDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimerDuration(parseInt(e.target.value));
    setTimerStarted(false);
  };

  return (
    <div className="workout-item card card-custom mb-3">
      <div className="card-body">
        <h5 className="card-title">{exercise.name}</h5>
        <p className="card-text">Type: {exercise.type}</p>
        <p className="card-text">Muscle: {exercise.muscle}</p>
        <p className="card-text">Difficulty: {exercise.difficulty}</p>
        <p className="card-text">Instructions: {exercise.instructions}</p>
        <div className="set-tracking">
          {sets.map((set, index) => (
            <div key={index}>
              <p>Set {index + 1}</p>
              <input
                type="text"
                value={set.weight}
                onChange={(e) => handleInputChange(index, 'weight', e.target.value)}
                placeholder="Weight"
              />
              <input
                type="text"
                value={set.reps}
                onChange={(e) => handleInputChange(index, 'reps', e.target.value)}
                placeholder="Reps"
              />
              {timerStarted && (
                <div style={{ textAlign: 'center' }}>
                  <Timer seconds={timerDuration} />
                  <select value={timerDuration} onChange={handleTimerDurationChange}>
                    <option value={60}>60 seconds</option>
                    <option value={90}>90 seconds</option>
                  </select>
                </div>
              )}
            </div>
          ))}
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-custom" onClick={handleAddSet}>
              Add Set
            </button>
            {liftHistory && (
              <button className="btn btn-custom" onClick={() => setShowWorkoutHistory(!showWorkoutHistory)}>
                {showWorkoutHistory ? 'Hide Lift History' : 'View Lift History'}
              </button>
            )}
          </div>
          {liftHistory && showWorkoutHistory && (
            <div className="lift-history-details">
              <p>Last Lift:</p>
              <p>Sets: {liftHistory.sets}</p>
              <p>Reps: {liftHistory.reps}</p>
              <p>Weight: {liftHistory.weight}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutItem;
