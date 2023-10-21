import {openModal} from "./workoutModal.js";
import {openExerciseView} from "./exerciseManagement.js";

const main = document.querySelector('main');

function addDeleteListeners(workouts, updateWorkouts) {
    const elements = document.querySelectorAll(`.workout-delete`);
    elements.forEach((element) => {
        element.addEventListener(
            'click',
            function () {
                const id = element.getAttribute('id').split('-')[1];
                const index = workouts.findIndex((workout) => workout._id === id);
                let updatedWorkouts = workouts;
                updatedWorkouts.splice(index, 1);
                updateWorkouts(updatedWorkouts);
            })
    })
}

function addOpenWorkoutListeners(workouts) {
    const elements = document.querySelectorAll(`.workout-info-container`);
    elements.forEach((element) => {
        element.addEventListener(
            'click',
            function() {
                const id = element.getAttribute('id');
                const index = workouts.findIndex((workout) => workout._id === id);
                openExerciseView(workouts[index].exercises, workouts[index]._id);
            }
        )
    })
}

export function workoutsLoadedUpdateHtml(workouts, updateWorkouts) {
    main.innerHTML = `<section class="workouts">
        <article class="workouts-headers">
            <h2 class="workouts-section-title">Workouts</h2>
            <button class="add-workout-button">Add workout</button>
        </article>
        <article class="workouts-section">
            <div class="workouts-list">
            </div>
        </article>
    </section>`;

    const addWorkout = document.querySelector('.add-workout-button');
    addWorkout.addEventListener('click', function () {
        openModal(workouts);
    })

    const workoutsList = document.querySelector('.workouts-list');
    workouts.forEach((workout) => {
        const workoutHTML = `<div class="workout">
                    <div class="workout-info-container" id="${workout._id}">
                        <h3 class="workout-title">${workout.title}</h3>
                        <p class="workout-exercises">${workout.exercises.map((exercise) => exercise.title).join(', ')}</p>
                    </div>
                    <div class="delete-container-placeholder">
                        <button 
                        class="workout-delete"
                        id="d-${workout._id}"
                        >Delete</button>
                    </div>
                </div>`;
        workoutsList.insertAdjacentHTML("beforeend", workoutHTML);
    })
    addDeleteListeners(workouts, updateWorkouts);
    addOpenWorkoutListeners(workouts);
}
