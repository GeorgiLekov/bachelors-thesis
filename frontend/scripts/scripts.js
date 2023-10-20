import {logInOrRegister} from "./http.js";
import {switchButtons} from "./switchButtons.js";

const logInButton = document.querySelector('.login-button');
logInButton.addEventListener(('click'), () => {
    if(logInButton.innerText==='Login'){
        const logIn = logInOrRegister('login');
    } else if (logInButton.innerText==='Register'){
        const register = logInOrRegister('signup');
    }
});

const registerSwitch = document.querySelector('.register-switch');
registerSwitch.addEventListener(('click'), switchButtons);
