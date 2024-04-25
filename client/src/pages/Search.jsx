import React from 'react';
import ExerciseForm from '../components/ExerciseForm.jsx';

const Search = ({ onExerciseAdded }) => {
  return (
    <div className="section-header">
      <h1>Find Exercises</h1>
      <p className="section-description">
        Select a muscle group to see related exercises.
      </p>
      <ExerciseForm onExerciseAdded={onExerciseAdded} />
    </div>
  );
};

export default Search;