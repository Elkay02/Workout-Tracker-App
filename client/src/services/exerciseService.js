const BASE_URL = 'https://api.api-ninjas.com/v1';


export const fetchExercises = async (muscle, type, difficulty) => {
  const url = `${BASE_URL}/exercises?muscle=${muscle}&type=${type}&difficulty=${difficulty}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Api-Key': import.meta.env.VITE_API_KEY,
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch exercises');
  }
  return response.json();
};

export const addExercise = async (exercise) => {
  const response = await fetch('http://localhost:3000/exercises', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(exercise)
  });
  if (!response.ok) {
    throw new Error('Failed to add exercise');
  }
  return response.json();
};