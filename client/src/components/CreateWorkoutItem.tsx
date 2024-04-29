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

const CreateWorkoutItem = ({ exercise }: Props) => {


  const [sets, setSets] = useState<Set[]>([{ weight: '', reps: '' }]);
  const [repeatedSet, setRepeatedSet] = useState({ sets: '', weight: '', reps: '' });
  const [saved, setSaved] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);


  const updateHistory = async (breakTime: number) => {
    try {
      const response = await fetch(`http://localhost:3000/exercises/${exercise._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          breakTime: breakTime,
          workoutHistory: sets
        })
      });
      if (!response.ok) {
        throw new Error('Failed to fetch lift history');
      }
    } catch (error) {
      console.error('Error fetching lift history:', error);
    }
  };

  const handleAddSet = () => {
    const newSet: Set = { weight: '', reps: '' };
    setSets([...sets, newSet]);
  };

  const handleInputChange = (index: number, key: keyof Set, value: string) => {
    const updatedSets = [...sets];
    updatedSets[index][key] = value;
    setSets(updatedSets);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const breaktime = minutes * 60 + seconds;
    if (!breaktime) {
      alert("Break can't be 0!");
    } else {
      if (checkbox) {
        sets.pop();
        for (let i = 0; i < parseInt(repeatedSet.sets); i++) {
          setSets(prevSets => [...prevSets, { weight: repeatedSet.weight, reps: repeatedSet.reps }])

        }
      }
      setSaved(true)
      updateHistory(breaktime);
    }
  }

  return (
    <div className="workout-item card card-custom mb-3">
      <div className="card-body">
        <h5 className="card-title">{exercise.name}</h5>
        <p className="card-text">Type: {exercise.type}</p>
        <p className="card-text">Muscle: {exercise.muscle}</p>
        <p className="card-text">Difficulty: {exercise.difficulty}</p>
        <p className="card-text">Instructions: {exercise.instructions}</p>
        {!saved && (
          <form className="set-tracking" onSubmit={handleSubmit}>
            <div>
              <h6>Set Break Time: </h6>
              <input
                type="number"
                name="minutes"
                placeholder="min"
                min="0"
                step="1"
                max="59"
                value={minutes}
                onKeyDown={(e) => e.preventDefault()}
                onChange={(e) => {
                  setMinutes(parseInt(e.target.value));
                }} /><label htmlFor="minutes">Min</label><input
                type="number"
                name="seconds"
                placeholder="sec"
                min="00"
                step="05"
                max="55"
                value={seconds}
                onKeyDown={(e) => e.preventDefault()}
                onChange={(e) => {
                  setSeconds(parseInt(e.target.value));
                }} /><label htmlFor="seconds">Sec</label>

            </div>

            <div>
              <h6>Repeat Same Set? </h6>
              <input
                type="checkbox"
                onChange={(e) => {
                  setCheckbox(e.target.checked);
                }}
              />
            </div>


            {checkbox && (
              <div>
                <input
                  type="number"
                  name="sets"
                  placeholder="sets"
                  min="0"
                  step="1"
                  max="100"
                  onKeyDown={(e) => e.preventDefault()}
                  onChange={(e) =>
                    setRepeatedSet({ ...repeatedSet, sets: e.target.value })
                  }
                  required
                />
                <label htmlFor="sets">Sets</label>
                <input
                  type="number"
                  name="weight"
                  placeholder="Kg"
                  min="0"
                  step="1"
                  onKeyDown={(e) => e.preventDefault()}
                  onChange={(e) =>
                    setRepeatedSet({ ...repeatedSet, weight: e.target.value })
                  }
                  required
                />
                <label htmlFor="weight">Kg</label>
                <input
                  type="number"
                  name="reps"
                  placeholder="reps"
                  min="0"
                  step="1"
                  onKeyDown={(e) => e.preventDefault()}
                  onChange={(e) =>
                    setRepeatedSet({ ...repeatedSet, reps: e.target.value })
                  }
                  required
                />
                <label htmlFor="reps">reps</label>
              </div>
            )}

            {!checkbox &&
              sets.map((set, index) => (
                <div key={index}>
                  <p>Set {index + 1}</p>
                  <input
                    type="text"
                    value={set.weight}
                    onChange={(e) =>
                      handleInputChange(index, "weight", e.target.value)
                    }
                    placeholder="Weight"
                    required
                  />
                  <input
                    type="text"
                    value={set.reps}
                    onChange={(e) =>
                      handleInputChange(index, "reps", e.target.value)
                    }
                    placeholder="Reps"
                    required
                  />
                  <button className="btn btn-custom" onClick={handleAddSet}>
                    Add Set
                  </button>
                </div>
              ))}


            <button type="submit">Save Exercises Info</button>
          </form>
        )}

        {saved && (
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

export default CreateWorkoutItem;
