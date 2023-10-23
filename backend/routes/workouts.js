const express = require('express');
const {
    getWorkouts, updateWorkouts
} = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

router.use(requireAuth);

// Get all workouts of user
router.get('/', getWorkouts);

// Update workouts
router.put('/', updateWorkouts);

module.exports = router;

// Post a new workout
// router.post('/', createWorkoutSet);

// Get a single workout
// router.get('/:id', getWorkout);

// Delete a workout
// router.delete('/:id', deleteWorkout);

// Update a workout
// router.patch('/:id', updateWorkout);
