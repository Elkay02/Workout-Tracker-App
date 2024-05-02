import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ExerciseForm from '../components/ExerciseForm'
import { MemoryRouter } from 'react-router-dom';
import WorkoutList from '../components/WorkoutList'


describe('Exercise Form', () => {
  it('renders the form elements initially', () => {
    render(
      <MemoryRouter>
        <ExerciseForm />
      </MemoryRouter>
    );


    // Check if the form elements are rendered
    const muscleGroupLabel = screen.getByLabelText('Muscle Group')
    const exerciseTypeLabel = screen.getByLabelText('Exercise Type')
    const difficultyLevelLabel = screen.getByLabelText('Difficulty Level')
    const searchButton = screen.getByRole('button', { name: 'Search' })

    expect(muscleGroupLabel).toBeInTheDocument()
    expect(exerciseTypeLabel).toBeInTheDocument()
    expect(difficultyLevelLabel).toBeInTheDocument()
    expect(searchButton).toBeInTheDocument()
  });

  it('filters exercises based on selected options', async () => {
    render(
      <MemoryRouter>
        <ExerciseForm />
      </MemoryRouter>
    );

    // Select options for Muscle Group
    const muscleGroupSelect = screen.getByLabelText('Muscle Group')
    fireEvent.change(muscleGroupSelect, { target: { value: 'Abductors' } })

    // Select options for Exercise Type
    const exerciseTypeSelect = screen.getByLabelText('Exercise Type')
    fireEvent.change(exerciseTypeSelect, { target: { value: 'Strength' } })

    // Select options for Difficulty Level
    const difficultyLevelSelect = screen.getByLabelText('Difficulty Level')
    fireEvent.change(difficultyLevelSelect, { target: { value: 'Beginner' } })

    // Click the Search button
    const searchButton = screen.getByRole('button', { name: 'Search' })
    fireEvent.click(searchButton)

    // Wait for exercises to appear
    await waitFor(() => {
      const foundExercises = screen.queryAllByRole('listitem')
      expect(foundExercises.length).toBeGreaterThan(0)
    })
  });

  it('add exercises to create workout page', async () => {
    render(
      <MemoryRouter>
        <ExerciseForm />
      </MemoryRouter>
    );

    // Select options for Muscle Group
    const muscleGroupSelect = screen.getByLabelText('Muscle Group')
    fireEvent.change(muscleGroupSelect, { target: { value: 'Abductors' } })

    // Select options for Exercise Type
    const exerciseTypeSelect = screen.getByLabelText('Exercise Type')
    fireEvent.change(exerciseTypeSelect, { target: { value: 'Strength' } })

    // Select options for Difficulty Level
    const difficultyLevelSelect = screen.getByLabelText('Difficulty Level')
    fireEvent.change(difficultyLevelSelect, { target: { value: 'Beginner' } })

    // Click the Search button
    const searchButton = screen.getByRole('button', { name: 'Search' })
    fireEvent.click(searchButton)

    // Wait for exercises to appear
    await waitFor(() => {
      const foundExercise = screen.getByRole('addbutton')
      fireEvent.click(foundExercise)
    })

    render(
      <MemoryRouter>
        <WorkoutList />
      </MemoryRouter>
    )

    const workoutline = screen.getByRole('workoutline')
    expect(workoutline).toBeInTheDocument()
  });
});