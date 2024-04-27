const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    muscle: {
        type: String,
        required: true
    },
    equipment: String,
    difficulty: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    workoutHistory: [
        {
            reps: Number,
            weight: Number,
            _id: false
        }
    ]
});

module.exports = mongoose.model('Exercise', exerciseSchema);