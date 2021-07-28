const login = document.getElementById('username');
const password = document.getElementById('password');
const box = document.getElementById('loginform');
const errorInfoLogin = document.getElementById('errorInfoLogin');
const submitButton = document.getElementById('submit');

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

function LoginformTotalDataCheck(e) {
    e.preventDefault();
    if (loginVisualValidation() &&
        passwordVisualValidation()) {
        return true;
    }
}

function sendData(e) {
    e.preventDefault();
    if (LoginformTotalDataCheck) {
        const data = {
            user_login: document.getElementById('username').value,
            user_password: document.getElementById('password').value,

        }
        fetch('http://org.localhost/php/api/create.php', {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(res => {
            console.log(res);
        })
    }

}

submitButton.addEventListener('click', sendData);