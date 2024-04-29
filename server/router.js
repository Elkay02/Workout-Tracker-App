const express = require('express');
const exerciseController = require('./controllers/exerciseController')
const workoutController = require('./controllers/workoutController')


const router = express.Router();

router.post('/exercises', exerciseController.createExercise);
router.get('/exercises', exerciseController.getExercises);
router.put('/exercises/:id', exerciseController.updateExercise);
router.delete('/exercises/:id', exerciseController.deleteExercise);

router.post('/exercises/workoutDone', exerciseController.markWorkoutDone);
router.get('/exercises/:id/lift-history', exerciseController.getExerciseLiftHistory);

router.post('/workout', workoutController.createWorkouts);
router.get('/workout', workoutController.getWorkouts);
router.get('/workout/:id', workoutController.getWorkoutById);

module.exports = router;