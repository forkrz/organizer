import { RegisterUser } from './RegisterUser.js';
const handlerSubmit = (e) => {
    e.preventDefault();
    const RegisterUser = new RegisterUser();
    RegisterUser.validateRegistrationData() ? RegisterUser.sendData() : 'showError()';
}
document.querySelector('#registerform').addEventListener('submit', handlerSubmit);
console.log(document.querySelector('#registerform'));