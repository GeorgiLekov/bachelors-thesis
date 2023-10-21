import {updateWorkouts} from "./http.js";

const cover = document.querySelector(
    '.modal-cover'
);

const modal = document.querySelector(
    '.workout-add-title-modal'
)

const createWorkoutButton = document.querySelector(
    '.create-workout-button'
);

const cancelWorkoutButton = document.querySelector(
    '.cancel-workout-creation'
);

let localWorkouts;

export function closeModal(title){
    modal.style.display = "none";
    cover.style.display = "none";
    console.log(title, 'title');
    if(title && title !== ''){
        updateWorkouts([
            {title: title},
            ...localWorkouts
        ])
    }
}

export function openModal(workouts) {
    modal.style.display = "flex";
    cover.style.display = "block";
    localWorkouts = workouts;
}

cancelWorkoutButton.addEventListener('click', function(){
    closeModal('')
});
createWorkoutButton.addEventListener('click', function(){
    const title = document.getElementById('workout-title-input-modal').value;
    closeModal(title)
});

