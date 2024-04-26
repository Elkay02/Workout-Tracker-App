import { Request, Response } from 'express';
import Exercise from '../models/Exercise';  // Assuming default export of the model

// Creating a new exercise
export const createExercise = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, type, muscle, difficulty, instructions } = req.body;
        const exercise = new Exercise({ name, type, muscle, difficulty, instructions });
        await exercise.save();
        res.status(201).json({ success: true, data: exercise });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// Getting all exercises
export const getExercises = async (req: Request, res: Response): Promise<void> => {
    try {
        const exercises = await Exercise.find();
        res.status(200).json({ success: true, data: exercises });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// Updating an exercise by ID
export const updateExercise = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, sets, reps, restInterval } = req.body;
        const exercise = await Exercise.findByIdAndUpdate(req.params.id, { name, sets, reps, restInterval }, { new: true });
        if (!exercise) {
            res.status(404).json({ success: false, error: 'Exercise not found' });
        }
        res.status(200).json({ success: true, data: exercise });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// Deleting an exercise by ID
export const deleteExercise = async (req: Request, res: Response): Promise<void> => {
    try {
        const exercise = await Exercise.findByIdAndDelete(req.params.id);
        if (!exercise) {
            res.status(404).json({ success: false, error: 'Exercise not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

interface Set {
    sets: number;
    reps: number;
    weight: number;
}

interface WorkoutSets {
    [key: string]: Set[];
}

// Workout is done and storing workout history
export const markWorkoutDone = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as WorkoutSets;
        for (const [exerciseId, sets] of Object.entries(body)) {
            const exercise = await Exercise.findById(exerciseId);
            if (exercise) {
                const formattedSets = sets.map((set: { sets: number, reps: number, weight: number }) => ({
                    sets: set.sets,
                    reps: set.reps,
                    weight: set.weight
                }));
                exercise.workoutHistory.push(...formattedSets);
                await exercise.save();
            }
        }
        res.status(200).json({ success: true, message: 'Workout history updated for all exercises' });
    } catch (error) {
        console.error('Error updating workout history:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// Fetch last lift history for exercise by ID
export const getExerciseLiftHistory = async (req: Request, res: Response): Promise<void> => {
    try {
        const exerciseId = req.params.id;
        const exercise = await Exercise.findById(exerciseId);
        if (!exercise) {
            res.status(404).json({ success: false, error: 'Exercise not found' });
        } else {
            const liftHistory = exercise.workoutHistory.slice(-1)[0];
            res.status(200).json({ success: true, data: liftHistory });
        }
    } catch (error) {
        console.error('Error fetching lift history:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};
