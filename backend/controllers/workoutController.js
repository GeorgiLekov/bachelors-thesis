const Workouts = require('../models/workoutModel');
const mongoose = require('mongoose');

// get all workouts
const getWorkouts = async (req, res) => {
    const user_id = req.user._id;
    try {
        const workouts = await Workouts.find({ user_id });

        res.status(200).json(workouts);
    } catch(error) {
        console.log(error);
        res.status(404).json({error: 'No workouts for user'})
    }
}

// create a new workouts set
const createWorkoutSet = async (req, res) => {
    let { workouts } = req.body;
    if(!workouts) {
        workouts = [];
    }

    try {
        const user_id = req.user._id;
        const workout = await Workouts.create({
            user_id,
            workouts
        });
        res.status(200).json(workout);
    } catch(error) {
        res.status(400).json({error: error});
    }
}

const updateWorkouts = async(req, res) => {
    const user_id = req.user._id;
    const { workouts } = req.body;
    try {
        const newWorkouts = await Workouts.findOneAndUpdate({ user_id: user_id }, { workouts: workouts }, { returnOriginal: false });
        res.status(200).json(newWorkouts);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error});
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'});
    }

    const workout = await Workout.findOneAndDelete({ _id: id });

    if(!workout) {
        return res.status(400).json({error: 'No such workout'});
    }
    res.status(200).json(workout);
}

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'});
    }

    const workout = await Workout.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!workout) {
        return res.status(400).json({error: 'No such workout'});
    }

    res.status(200).json(workout);
}

module.exports = {
    createWorkoutSet,
    getWorkouts,
    deleteWorkout,
    updateWorkout,
    updateWorkouts
}
