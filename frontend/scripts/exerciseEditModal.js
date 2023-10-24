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

let exerciseEdit = {};
let editedIndex = -1;
let isEdit = false;

export function openExerciseEditModal(exercise, index) {
    modal.style.display = "flex";
    cover.style.display = "block";
    errorBlock.innerText = '';
    console.log(exercise);
    editedIndex = -1;

    if (!exercise) {
        isEdit = false;
    } else {
        console.log('edit mode is on');
        isEdit = true;
        editedIndex = index;
        title.value = exercise.title;
        sets.value = exercise.sets;
        reps.value = exercise.reps;
        load.value = exercise.load;
    }
}

function resetForm() {
    title.value = null;
    sets.value = null;
    reps.value = null;
    load.value = null;
}

function cancelEdit() {
    modal.style.display = "none";
    cover.style.display = "none";
    resetForm()
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
        !exerciseEdit.load
    ) {
        errorBlock.innerText = 'All fields are mandatory';
    } else if (exerciseEdit.title.length < 4) {
        errorBlock.innerText = 'Title needs to be at least 4 characters.';
    } else {
        cancelEdit();
        if(!isEdit){
            addNewExercise({...exerciseEdit})
        } else {
            editExercise({...exerciseEdit}, editedIndex);
            isEdit = false;
        }
    }

}

cancelExerciseEditButton.addEventListener('click', function () {
    cancelEdit()
});
saveExerciseButton.addEventListener('click', function () {
    closeModalWithNewExercise()
});
