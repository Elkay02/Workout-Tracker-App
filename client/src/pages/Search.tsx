import React from 'react';
import ExerciseForm from '../components/ExerciseForm.js';

const Search = () => {
  return (
    <div className="section-header">
      <h1>Find Exercises</h1>
      <p className="section-description">
        Select a muscle group to see related exercises.
      </p>
      <ExerciseForm />
    </div>
  );
};

export default Search;