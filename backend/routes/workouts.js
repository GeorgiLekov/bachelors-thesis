const express = require('express');
const {
    getWorkouts, updateWorkouts, createWorkoutSet
} = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

router.use(requireAuth);

// Get all workouts of user
router.get('/', getWorkouts);

// Post a new workout
router.post('/', createWorkoutSet);

// Update workouts
router.put('/', updateWorkouts);

// Get a single workout
// router.get('/:id', getWorkout);

// Delete a workout
// router.delete('/:id', deleteWorkout);

// Update a workout
// router.patch('/:id', updateWorkout);

module.exports = router;
