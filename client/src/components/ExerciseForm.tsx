import React, { useState } from 'react';
import '../App.css';
import { fetchExercises, addExercise } from '../services/exerciseService';
import { Link } from 'react-router-dom';
import { useWorkoutContext } from '../App';

interface Exercise {
  _id: string;
  name: string;
  type: string;
  muscle: string;
  difficulty: string;
  instructions: string;
}

const ExerciseForm = () => {

  const { handleExerciseAdded, isProgress } = useWorkoutContext();
  const [formData, setFormData] = useState({
    muscle: '',
    type: '',
    difficulty: '',
    exercises: [] as Exercise[],
  });
  const [error, setError] = useState<string | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await fetchExercises(formData.muscle, formData.type, formData.difficulty);
      setExercises(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      setError('Failed to fetch exercises. Please try again.');
    }
  };

  const handleAddExercise = async (exercise: Exercise) => {
    try {
      const updatedExercises = [...formData.exercises, { ...exercise, sets: [] }];
      setFormData({ ...formData, exercises: updatedExercises });
      const { data } = await addExercise(exercise);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
      if (isProgress) {
        addProgress(data.name)
      } else {
        setIsEmpty(false);
        handleExerciseAdded(data);
      }
    } catch (error) {
      console.error('Error adding exercise:', error);
      setError('Failed to add exercise. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addProgress = async (name: String) => {
    try {
      const response = await fetch('http://localhost:3000/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response);

    } catch (error) {
      console.error('Error marking workout as done:', error);
    }
  }


  // Manually entered options according to the API list
  const muscleGroupOptions = ['Abdominals', 'Abductors', 'Adductors', 'Biceps', 'Calves', 'Chest', 'Forearms',
    'Glutes', 'Hamstrings', 'Lats', 'Lower_back', 'Middle_back', 'Neck', 'Quadriceps', 'Traps', 'Triceps'];
  const exerciseTypeOptions = ['Strength', 'Cardio', 'Powerlifting', 'Stretching'];
  const difficultyOptions = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-body">
          {error && <p className="error-message">{error}</p>}
          {showAlert && (
            <div className="alert-overlay">
              <div className="alert-box alert alert-success">Exercise added successfully!</div>
            </div>
          )}
          <form onSubmit={handleSubmit} className="row g-3 align-items-center centered-form">
            <div className="col-auto">
              <label htmlFor="muscle" className="visually-hidden">Muscle Group</label>
              <select id="muscle" className="form-select" name="muscle" value={formData.muscle} onChange={handleChange}>
                <option value="">Muscle Group</option>
                {muscleGroupOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="col-auto">
              <label htmlFor="type" className="visually-hidden">Exercise Type</label>
              <select id="type" className="form-select" name="type" value={formData.type} onChange={handleChange}>
                <option value="">Exercise Type</option>
                {exerciseTypeOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="col-auto">
              <label htmlFor="difficulty" className="visually-hidden">Difficulty Level</label>
              <select id="difficulty" className="form-select" name="difficulty" value={formData.difficulty} onChange={handleChange}>
                <option value="">Difficulty Level</option>
                {difficultyOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary my-search-button">Search</button>
            </div>
          </form>
          <br />
          {!isEmpty && <Link className="btn btn-primary my-search-button" to='/createWorkout'>Go to Workout</Link>}
        </div>
      </div>
      {exercises.length > 0 && (
        <div className="mt-4 found-exercises">
          <h4>Found Exercises:</h4>
          <ul className="list-group">
            {exercises.map((exercise, index) => (
              <li key={index} className="list-group-item">
                <h5 className="exercise-name">{exercise.name}</h5>
                <p className="exercise-type">Type: {exercise.type}</p>
                <p className="exercise-muscle">Muscle: {exercise.muscle}</p>
                <p className="exercise-difficulty">Difficulty: {exercise.difficulty}</p>
                <p className="exercise-instructions">{exercise.instructions}</p>
                <button onClick={() => handleAddExercise(exercise)} className="btn btn-primary my-add-exercise-button" role='addbutton'>Add Exercise</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExerciseForm;
