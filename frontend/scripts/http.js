import {stopLoading, beginLoading} from "./loader.js";

let JWT;
let workouts=[
    {
        "title": "Bench press",
        "reps": 10,
        "load": 70,
        "_id": "65316fb90c4b5d147b4078b0",
        "createdAt": "2023-10-19T18:04:41.923Z",
        "updatedAt": "2023-10-19T18:04:41.923Z"
    },
    {
        "title": "Pull ups",
        "reps": 10,
        "load": 0,
        "_id": "65316fb90c4b5d147b4078b1",
        "createdAt": "2023-10-19T18:04:41.923Z",
        "updatedAt": "2023-10-19T18:04:41.923Z"
    }
];

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
        await loadWorkouts();
    }
    stopLoading();
}

async function loadWorkouts() {
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
        console.log(workouts);
    }
}

export {logInOrRegister, JWT};
