const Workout = require('../models/Workout');

//creating a new exercise
exports.createWorkouts = async (req, res) => {
  try {
    const { name, exercises } = req.body;
    const workout = new Workout({
      name,
      exercises
    });
    await workout.save();
    res.status(201).json({ success: true, data: workout });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

//getting all exercises
exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.status(200).json({ success: true, data: workouts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id).populate('exercises');
    if (!workout) {
      return res.status(404).json({ success: false, error: 'Workout not found' });
    }
    res.status(200).json({ success: true, data: workout });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
