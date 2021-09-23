const login = document.getElementById('username');
const password = document.getElementById('password');
const box = document.getElementById('loginform');
const errorInfoLogin = document.getElementById('errorInfoLogin');
const errorInfoPassword = document.getElementById('errorInfoPassword');
const errorData = document.getElementById('errorData');
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
        return false;
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
        return false;
    }
    if (!errorMaxLengthPasswordCommunicate()) {
        errorInfoPassword.textContent = "Password max length is 128 characters";
        box.classList.add('invalid');
        errorInfoPassword.classList.remove('hide');
        return false;
    }
    if (!LowerCasePasswordCheck()) {
        errorInfoPassword.textContent = "Password must have at least one lower case letter";
        box.classList.add('invalid');
        errorInfoPassword.classList.remove('hide');
        return false;
    }
    if (!UpperCasePasswordCheck()) {
        errorInfoPassword.textContent = "Password must have at least one upper case letter";
        box.classList.add('invalid');
        errorInfoPassword.classList.remove('hide');
        return false;
    }
    if (!NumberPasswordCheck()) {
        box.classList.add('invalid');
        errorInfoPassword.classList.remove('hide');
        errorInfoPassword.textContent = "Password must have at least one number";
        return false;
    }
    if (!SpecialCharPasswordCheck()) {
        errorInfoPassword.textContent = "Password must have at least one special character";
        box.classList.add('invalid');
        errorInfoPassword.classList.remove('hide');
        return false;
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
    } else {
        return false;
    }
}

function setCookie(cname, cvalue) {
    const d = new Date();
    d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 100));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function sendData(e) {
    e.preventDefault();
    if (LoginformTotalDataCheck(e)) {
        const data = {
            USER_LOGIN: document.getElementById('username').value,
            USER_PASSWORD: document.getElementById('password').value,

        }
        fetch('http://org.localhost/php/api/login.php', {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(res => {
            if (loginCredentialsApiCheck(res.message)) {
                setCookie('jwt', res.jwt);
                validateCookie();
            } else {
                errorData.classList.remove('hide');
            }

        });
    } else {
        console.log('test');
        errorData.classList.remove('hide');
    }
}


function loginCredentialsApiCheck(message) {
    if (message == 'Login failed.') {
        return false;
    } else {
        return true;
    }
}


function getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function validateCookie() {
    const jwt = getCookie('jwt');
    const data = {
        jwt: jwt
    }
    fetch('http://org.localhost/php/api/tokenValidation.php', {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(res => {
        if ((res.message = "Access granted.")) {
            window.location.replace('http://org.localhost/userFrontPage.html');
        } else {

        }
    });
}




submitButton.addEventListener('click', sendData);


function isLogged() {
    let JWTCookie = getCookie("jwt");
    if (JWTCookie !== '') {
        window.location.replace('http://org.localhost/userFrontPage.html');
    } else {

    }
}

isLogged();