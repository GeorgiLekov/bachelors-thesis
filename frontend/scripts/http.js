import {stopLoading, beginLoading} from "./loader.js";
import {workoutsLoadedUpdateHtml} from "./workoutsManagement.js";

let JWT;
let workouts;

async function logInOrRegister(mode) {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const body = {
        "email": email,
        "password": password,
    };
    beginLoading();
    const response = await fetch(`http://localhost:4000/api/user/${mode}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    const json = await response.json();
    if (json.error) {
        document.querySelector('.error').innerText = json.error;
    }
    if (json.token) {
        document.querySelector('.error').innerText = '';
        JWT = json.token;
        console.log(JWT, 'JWT');
        stopLoading();
        await loadWorkouts();
    }
}

export async function updateWorkouts(updatedWorkouts) {
    beginLoading();
    const response = await fetch(`http://localhost:4000/api/workouts`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer: ${JWT}`,
        },
        body: JSON.stringify({workouts: updatedWorkouts})
    });
    const json = await response.json();
    if(json.error){
        console.log(json.error);
    }
    if(json) {
        workouts = json.workouts;
        workoutsLoadedUpdateHtml(workouts, updateWorkouts);
    }
    stopLoading();
}

export async function loadWorkouts() {
    beginLoading();
    const response = await fetch(`http://localhost:4000/api/workouts`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer: ${JWT}`,
        },
    });
    const json = await response.json();
    if(json.error){

    }
    if(json) {
        workouts = json.workouts;
        workoutsLoadedUpdateHtml(workouts, updateWorkouts);
    }
    stopLoading();
}
export function modifyWorkoutExercisesAndSafeWorkouts(exercises, workoutId){
    const updatedWorkouts = workouts;
    const index = workouts.findIndex((workout) => workout._id === workoutId);
    updatedWorkouts[index].exercises = exercises;
    updateWorkouts(updatedWorkouts);
}

export {logInOrRegister, JWT};
