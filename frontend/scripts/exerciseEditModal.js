import {addNewExercise, editExercise} from "./exerciseManagement.js";

const cover = document.querySelector(
    '.modal-cover'
);

const modal = document.querySelector(
    '.exercise-edit-modal'
)

const saveExerciseButton = document.querySelector(
    '.save-exercise-button'
);

const cancelExerciseEditButton = document.querySelector(
    '.cancel-exercise-creation-button'
);

const errorBlock = document.querySelector(
    '.exercise-edit-error-message'
)

const title = document.getElementById('exercise-title-input-modal');
const sets = document.getElementById('exercise-sets-input-modal');
const reps = document.getElementById('exercise-reps-input-modal');
const load = document.getElementById('exercise-load-input-modal');

let exerciseEdit;
let isEdit = false;

export function openExerciseEditModal(exercise) {
    modal.style.display = "flex";
    cover.style.display = "block";
    errorBlock.innerText = '';
    console.log(exercise);

    exerciseEdit = exercise;
    if (!exercise) {
        exerciseEdit = {
            title: '',
            sets: 0,
            reps: 0,
            load: 0
        }
        isEdit = false;
    } else {
        console.log('edit mode is on');
        isEdit = true;
    }
    title.value = exerciseEdit.title;
    sets.value = exerciseEdit.sets;
    reps.value = exerciseEdit.reps;
    load.value = exerciseEdit.load;
}

function cancelEdit() {
    modal.style.display = "none";
    cover.style.display = "none";
}

function closeModalWithNewExercise() {
    exerciseEdit.title = title.value;
    exerciseEdit.sets = sets.value;
    exerciseEdit.reps = reps.value;
    exerciseEdit.load = load.value;
    if (
        !exerciseEdit.title ||
        !exerciseEdit.sets ||
        !exerciseEdit.reps ||
        !exerciseEdit.load ||
        exerciseEdit.title.length < 4
    ) {
        errorBlock.innerText = 'All fields are mandatory';
    } else {
        cancelEdit();
        if(!isEdit){
            addNewExercise(exerciseEdit)
        } else {
            editExercise(exerciseEdit);
        }
    }

}

cancelExerciseEditButton.addEventListener('click', function () {
    cancelEdit()
});
saveExerciseButton.addEventListener('click', function () {
    closeModalWithNewExercise()
});
