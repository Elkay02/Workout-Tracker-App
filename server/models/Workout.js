const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise'
    }
  ]
});

module.exports = mongoose.model('Workout', workoutSchema);