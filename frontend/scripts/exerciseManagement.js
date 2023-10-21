import {loadWorkouts, modifyWorkoutExercisesAndSafeWorkouts} from "./http.js";
import {openExerciseEditModal} from "./exerciseEditModal.js";

const main = document.querySelector('main');

let exercises;
let currentWorkoutId;

function addExerciseDeleteListeners() {
    const elements = document.querySelectorAll(`.exercise-delete-button`);
    elements.forEach((element) => {
        element.addEventListener(
            'click',
            function () {
                const index = parseInt(element.getAttribute('id'));
                let updatedExercises = exercises;
                updatedExercises.splice(index, 1);
                openExerciseView(updatedExercises);
            })
    })
}

function safeWorkout() {
    modifyWorkoutExercisesAndSafeWorkouts(exercises, currentWorkoutId);
}

export function openExerciseView(exercisesInput, workoutId) {
    // Safe the workout id if provided
    if(workoutId){
        currentWorkoutId = workoutId;
    }

    // Add HTML for the section
    exercises = exercisesInput || [];
    main.innerHTML = `<section class="exercises">
        <article class="exercise-headers">
            <h2 class="exercise-section-title">Exercises</h2>
            <div class="exercise-section-button-holder">
                <button class="add-exercise-button">Add Exercise</button>
                <button class="save-workout-button">Save Workout</button>
                <button class="cancel-edit-button">Cancel</button>
            </div>
        </article>
        <article class="exercise-list">
        </article>
    </section>`;

    // Add HTML for all exercises
    const exerciseList = document.querySelector('.exercise-list');
    exercises.forEach((exercise, index) => {
        const exerciseHTML = `<div class="exercise">
                <h3 class="exercise-title">${exercise.title}</h3>
                <div class="exercise-content">
                    <p class="exercise-sets">Sets: ${exercise.sets}</p>
                    <p class="exercise-reps">Reps: ${exercise.reps}</p>
                    <p class="exercise-load">Load: ${exercise.load}kg</p>
                    <div class="exercise-delete-section">
                    <button 
                    class="exercise-edit-button"
                    id="${exercise._id}"
                    >Edit</button>
                    <button 
                    class="exercise-delete-button"
                    id="${index}"
                    >Delete</button>
                </div>
                </div>
            </div>`;
        exerciseList.insertAdjacentHTML("beforeend", exerciseHTML);
    });
    // Add listener to safe the workout with its exercises
    const safeButton = document.querySelector(".save-workout-button");
    safeButton.addEventListener(('click'), safeWorkout)

    // Add listener to the cancel button
    const cancelButton = document.querySelector(".cancel-edit-button");
    cancelButton.addEventListener(('click'), loadWorkouts);

    // Add listeners for adding and editing the exercises
    const addExerciseButton = document.querySelector(".add-exercise-button");
    addExerciseButton.addEventListener(('click'), function (){
        openExerciseEditModal(undefined);
    });
    const exerciseCards = document.querySelectorAll('.exercise-edit-button');
    exerciseCards.forEach((exerciseCard) => exerciseCard.addEventListener(('click'), function (){
        const id = exerciseCard.getAttribute('id');
        const index = exercises.findIndex((exerciseItem) => exerciseItem._id === id);
        openExerciseEditModal(exercises[index]);
    }))

    // Add listeners for deleting exercises
    addExerciseDeleteListeners();

}

export function addNewExercise(exercise) {
    const updatedExercises = [exercise, ...exercises];
    openExerciseView(updatedExercises);
}

export function editExercise(editedExercise) {
    const index = exercises.findIndex((exerciseItem) => exerciseItem._id === editedExercise._id)
    let updatedExercises = exercises;
    updatedExercises[index] = editedExercise;
    openExerciseView(updatedExercises);
}
