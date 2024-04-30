const express = require('express');
const exerciseController = require('./controllers/exerciseController')
const workoutController = require('./controllers/workoutController')
const progressController = require("./controllers/progressController");


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

router.post("/progress", progressController.createProgress);
router.get("/progress", progressController.getProgresss);
router.put("/progress", progressController.updateProgress);

module.exports = router;