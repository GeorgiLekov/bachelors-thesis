const express = require('express');
const Workout = require('../models/workoutModel');

const router = express.Router();

// Get all workouts of user
router.get('/', (req, res) => {
    res.json({mssg: 'get all workouts'});
});

// Get a single workout
router.get('/:id', (req, res) => {
    res.json({mssg: 'get single workout'});
});

// Post a new workout
router.post('/', async (req, res) => {
    const { title, load, reps } = req.body;

    try {
        const workout = await Workout.create({
            title,
            reps,
            load,
        })
        res.status(200).json(workout);
    } catch(error) {
        res.status(400).json({error: error});
    }
    res.json({mssg: 'post new workout'});
});

// Delete a workout
router.delete('/:id', (req, res) => {
    res.json({mssg: 'delete workout'});
});

// Update a workout
router.patch('/:id', (req, res) => {
    res.json({mssg: 'update workout'});
});

module.exports = router;
