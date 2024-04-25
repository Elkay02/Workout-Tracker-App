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

interface Set {
  weight: string;
  reps: string;
}

interface LiftHistory {
  sets: string;
  reps: string;
  weight: string;
}

interface Props {
  exercise: Exercise;
  setWorkoutData: React.Dispatch<React.SetStateAction<{ [key: string]: Set[] }>>;
}

const WorkoutItem = ({ exercise, setWorkoutData }: Props) => {

  const [timerDuration, setTimerDuration] = useState<number>(60);
  const [liftHistory, setLiftHistory] = useState<LiftHistory | null>(null);
  const [showWorkoutHistory, setShowWorkoutHistory] = useState(false);

  const [sets, setSets] = useState<Set[]>([{ weight: '', reps: '' }]);
  console.log('WorkoutItem ~ sets:', sets);
  const [repeatedSet, setRepeatedSet] = useState({ sets: '', weight: '', reps: '' });
  console.log('WorkoutItem ~ repeatedSet:', repeatedSet);
  const [startTime, setStartTime] = useState(false);
  const [exercising, setExercising] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [finished, setFinished] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [myIndex, setMyIndex] = useState(0);

  useEffect(() => {
    setFinished(myIndex >= sets.length)
  }, [myIndex])

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
    const newSet: Set = { weight: '', reps: '' };
    setSets([...sets, newSet]);
    setStartTime(false);
  };

  const handleInputChange = (index: number, key: keyof Set, value: string) => {
    const updatedSets = [...sets];
    updatedSets[index][key] = value;
    setSets(updatedSets);
    // if (value !== '' && sets[index].weight !== '' && sets[index].reps !== '') {
    //   setStartTime(true);
    // }
  };

  const handleTimerDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimerDuration(parseInt(e.target.value));
    setStartTime(false);
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
      setTimerDuration(breaktime);
      setExercising(true)
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
        {!exercising && <form className="set-tracking" onSubmit={handleSubmit}>
          <div>
            <h6>Set Break Time: </h6>
            <input
              type="number"
              name='minutes'
              placeholder='min'
              min='0'
              step='1'
              max='59'
              value={minutes}
              onKeyDown={(e) => e.preventDefault()}
              onChange={(e) => { setMinutes(parseInt(e.target.value)) }}
            />
            <label htmlFor="minutes">Min</label>
            <input
              type="number"
              name='seconds'
              placeholder='sec'
              min='00'
              step='05'
              max='55'
              value={seconds}
              onKeyDown={(e) => e.preventDefault()}
              onChange={(e) => { setSeconds(parseInt(e.target.value)) }}
            />
            <label htmlFor="seconds">Sec</label>
          </div>
          <div>
            <h6>Repeat Same Set? </h6>
            <input type="checkbox" onChange={(e) => { setCheckbox(e.target.checked) }} />
          </div>

          {checkbox &&
            <div>
              <input
                type="number"
                name='sets'
                placeholder='sets'
                min='0'
                step='1'
                max='100'
                onKeyDown={(e) => e.preventDefault()}
                onChange={(e) => setRepeatedSet({ ...repeatedSet, sets: e.target.value })}
                required
              />
              <label htmlFor="sets">Sets</label>
              <input
                type="number"
                name='weight'
                placeholder='Kg'
                min='0'
                step='1'
                onKeyDown={(e) => e.preventDefault()}
                onChange={(e) => setRepeatedSet({ ...repeatedSet, weight: e.target.value })}
                required
              />
              <label htmlFor="weight">Kg</label>
              <input
                type="number"
                name='reps'
                placeholder='reps'
                min='0'
                step='1'
                onKeyDown={(e) => e.preventDefault()}
                onChange={(e) => setRepeatedSet({ ...repeatedSet, reps: e.target.value })}
                required
              />
              <label htmlFor="reps">reps</label>
            </div>
          }

          {(!checkbox) && (
            sets.map((set, index) => (
              <div key={index}>
                <p>Set {index + 1}</p>
                <input
                  type="text"
                  value={set.weight}
                  onChange={(e) => handleInputChange(index, 'weight', e.target.value)}
                  placeholder="Weight"
                  required
                />
                <input
                  type="text"
                  value={set.reps}
                  onChange={(e) => handleInputChange(index, 'reps', e.target.value)}
                  placeholder="Reps"
                  required
                />
                <button className="btn btn-custom" onClick={handleAddSet}>Add Set</button>
              </div>
            ))
          )}

          <button type="submit">Start Exercise</button>


          {/* {sets.map((set, index) => (
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
            <button className="btn btn-custom" onClick={handleAddSet}>Add Set</button>
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
          )} */}

        </form>}
        {exercising && sets[myIndex] && <div>
          <h6>Set {myIndex + 1}</h6>
          <h6>Weight: {sets[myIndex].weight} Kg</h6>
          <h6>Reps: {sets[myIndex].reps}</h6>
          <button onClick={(e) => { setStartTime(true) }}>Finished Set</button>
          {startTime && <Timer seconds={timerDuration} setIndex={setMyIndex} setStart={setStartTime} />}
        </div>
        }
        {
          finished && <h1>You're Done!!</h1>
        }
      </div>
    </div>
  );
};

export default WorkoutItem;
