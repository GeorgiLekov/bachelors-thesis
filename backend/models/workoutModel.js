const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
});

// define how should a workout look
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    exercises: [exerciseSchema]
});

// define how should workouts look
const workoutsSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    workouts: {
        type: [workoutSchema]
    }
}, { timestamps: true });

module.exports = mongoose.model('Workouts', workoutsSchema);
