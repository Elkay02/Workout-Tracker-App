import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import DislpayWorkoutItem from './DisplayWorkoutItem';
import CreateWorkoutItem from './CreateWorkoutItem';
import { useWorkoutContext } from '../App';

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
  exercises: Exercise[];
  isOld: Boolean;
}

const WorkoutList = ({ exercises, isOld }: Props) => {

  const navigate = useNavigate();
  const { setWorkoutList } = useWorkoutContext()

  const [workoutName, setWorkoutName] = useState('')
  const [saveCount, setSaveCount] = useState(0)

  const handleWorkoutDone = async () => {
    const exercisesIds = exercises.map(ex => ex._id)
    if (workoutName === '') {
      alert('Please name your workout!')
    } else if (saveCount < exercises.length) {
      alert('Please save all the information before submitting!')
    } else {
      try {
        const response = await fetch('http://localhost:3000/workout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: workoutName,
            exercises: exercisesIds
          })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setWorkoutList([])
        navigate(`/workoutLib`);
      } catch (error) {
        console.error('Error marking workout as done:', error);
      }
    }
  };

  const incrementSaveCount = () => {
    setSaveCount(saveCount + 1);
  };

  return (
    <>
      {!isOld && <input
        type="text"
        placeholder='Name your Workout'
        value={workoutName}
        onChange={(e) => { setWorkoutName(e.target.value) }}
        required
        className="my-4"
      />}
      {exercises.map((exercise) => (
        <React.Fragment key={exercise._id}>
          {isOld ? <DislpayWorkoutItem key={exercise._id} exercise={exercise} /> : <CreateWorkoutItem key={exercise._id} exercise={exercise} SaveInc={incrementSaveCount} />}
          <hr className="my-4" style={{ borderColor: '#FFD700' }} />
        </React.Fragment>
      ))}
      {!isOld && <div className="d-grid gap-2">
        <button onClick={handleWorkoutDone} className="btn mt-2" role='workoutline'>
          Submit Workout
        </button>
      </div>}
    </>
  );
};

export default WorkoutList;
