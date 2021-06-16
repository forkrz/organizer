import { RegisterUser } from './registerUser.js';
import { formValidation } from './formValidation.js';
const handlerSubmit = (e) => {
    e.preventDefault();
    const RU = new RegisterUser();
    RU.validateRegistrationData() ? RU.sendData() : 'showError()';
}

const emailValidation = (e) => {
    e.preventDefault();
    const fv = new formValidation();
    fv.validEmail;

}


// document.querySelector('#registerform').addEventListener('submit', handlerSubmit);
// console.log(document.querySelector('#registerform'));

document.querySelector('#registerform').addEventListener('submit', emailValidation);
console.log(document.querySelector('registerform'));