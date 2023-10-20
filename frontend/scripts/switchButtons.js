const signInText = "Have an account? Sign in."
const registerText = "Register if you don't have an account";
export function switchButtons() {
    const registerSwitch = document.querySelector('.register-switch');
    const logInButton = document.querySelector('.form-submit');
    if(registerSwitch.innerText === signInText){
        registerSwitch.innerText=registerText;
        logInButton.innerText='Login';
    } else if(registerSwitch.innerText === registerText){
        registerSwitch.innerText = signInText;
        logInButton.innerText='Register';
    }
}
