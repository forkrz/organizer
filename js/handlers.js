const login = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password_confirm = document.getElementById('confirm_password');
const submitButton = document.getElementById('submit');
const box = document.getElementById('registerform');

const errorInfoLogin = document.getElementById('errorInfoLogin');
const errorInfoEmail = document.getElementById('errorInfoEmail');
const errorInfoPassword = document.getElementById('errorInfoPassword');
const errorInfoConfirmPassword = document.getElementById('errorInfoConfirmPassword');

const data = {
    user_login: document.getElementById('username').value,
    email: document.getElementById('email').value,
    user_password: document.getElementById('password').value,
}

function loginLengthCheck() {
    if (login.value.length > 5 && login.value.length < 17) {
        return true;
    } else {
        return false;
    }
}

function errorInfoLoginCommunicate() {
    if (login.value.length > 16) {
        errorInfoLogin.textContent = "Maximum login length is 16 characters";
    } else {
        errorInfoLogin.textContent = "Login must have at least 6 characters";
    }

}

function loginVisualValidation() {
    let loginLength = loginLengthCheck();
    errorInfoLoginCommunicate();
    if (loginLength == true) {
        box.classList.remove('invalid');
        errorInfoLogin.classList.add('hide');
        return true;
    } else {
        box.classList.add('invalid');
        errorInfoLogin.classList.remove('hide');

    }

}



login.addEventListener('keyup', loginVisualValidation);



function emailFormatCheck() {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;;
    return regex.test(email.value);

}

function emailVisualValidation() {
    let emailFormat = emailFormatCheck();

    if (emailFormat == true) {
        box.classList.remove('invalid');
        errorInfoEmail.classList.add('hide');
        return true;
    } else {
        box.classList.add('invalid');
        errorInfoEmail.classList.remove('hide');
    }
}


email.addEventListener('keyup', emailVisualValidation);

function errorMinLengthPasswordCommunicate() {
    if (password.value.length < 8) {
        return false;
    } else {
        return true;
    }

}

function errorMaxLengthPasswordCommunicate() {
    if (password.value.length > 127) {
        return false;
    } else {
        return true;
    }
}

function LowerCasePasswordCheck() {
    const regex = /.*[a-z].*/;
    let check = regex.test(password.value);
    if (check == true) {
        return true;
    } else {
        return false;
    }
}

function UpperCasePasswordCheck() {
    const regex = /.*[A-Z].*/;
    let check = regex.test(password.value);
    if (check == true) {
        return true;
    } else {
        return false;
    }
}

function NumberPasswordCheck() {
    const regex = /.*[0-9].*/;
    let check = regex.test(password.value);
    if (check == true) {
        return true;
    } else {
        return false;
    }
}

function SpecialCharPasswordCheck() {
    const regex = /.*[!@#\$%\^&\*]/;
    let check = regex.test(password.value);
    if (check == true) {
        return true;
    } else {
        return false;
    }
}



function passwordVisualValidation() {
    if (!errorMinLengthPasswordCommunicate()) {
        errorInfoPassword.textContent = "Password must have at least 8 characters";
        box.classList.add('invalid');
        errorInfoPassword.classList.remove('hide');
        return
    }
    if (!errorMaxLengthPasswordCommunicate()) {
        errorInfoPassword.textContent = "Password max length is 128 characters";
        box.classList.add('invalid');
        errorInfoPassword.classList.remove('hide');
        return
    }
    if (!LowerCasePasswordCheck()) {
        errorInfoPassword.textContent = "Password must have at least one lower case letter";
        box.classList.add('invalid');
        errorInfoPassword.classList.remove('hide');
        return
    }
    if (!UpperCasePasswordCheck()) {
        errorInfoPassword.textContent = "Password must have at least one upper case letter";
        box.classList.add('invalid');
        errorInfoPassword.classList.remove('hide');
        return
    }
    if (!NumberPasswordCheck()) {
        box.classList.add('invalid');
        errorInfoPassword.classList.remove('hide');
        errorInfoPassword.textContent = "Password must have at least one number";
        return
    }
    if (!SpecialCharPasswordCheck()) {
        errorInfoPassword.textContent = "Password must have at least one special character";
        box.classList.add('invalid');
        errorInfoPassword.classList.remove('hide');
        return
    }
    box.classList.remove('invalid');
    errorInfoPassword.classList.add('hide');
    return true;
}


password.addEventListener('keyup', passwordVisualValidation);


function passwordMatchCheck() {
    if (passwordVisualValidation() == true) {
        return (password.value == password_confirm.value)
    }
    return false;
}

function confirmPasswordVisualValidation() {
    if (passwordMatchCheck() == true) {
        box.classList.remove('invalid');
        errorInfoConfirmPassword.classList.add('hide');
        return true;
    } else {
        box.classList.add('invalid');
        errorInfoConfirmPassword.classList.remove('hide');
    }
}

password_confirm.addEventListener('keyup', confirmPasswordVisualValidation);

function RegisterFormTotalDataCheck(e) {
    e.preventDefault();
    if (loginVisualValidation() &&
        emailVisualValidation() &&
        passwordVisualValidation() &&
        confirmPasswordVisualValidation()) {
        return true;
    }
}

function sendData(e) {
    e.preventDefault();
    if (!RegisterFormTotalDataCheck) {
        console.log(document.getElementById('username'));
    } else {
        console.log(data.value);
        fetch('http://org.localhost/php/api/create.php', {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(res => {
            console.log("Dodałem użytkownika:");
            console.log(res);
        })
    }

}

submitButton.addEventListener('click', sendData);