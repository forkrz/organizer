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
const errorInfoDbCheck = document.getElementById('errorInfoDbCheck');

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

function isLogged() {
    const cookie = getCookie('jwt');
    if (!cookie) {
        window.location.replace('http://org.localhost/index.html');
    } else {

    }
}

isLogged();



function loginLengthCheck() {
    if ((login.value.length > 5 && login.value.length < 17) || login.value.length == 0) {
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

    if (emailFormat == true || email.value == 0) {
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
    if (!password.value.length < 8 || password.value.length == 0) {
        return true;
    } else {
        return false;
    }

}

function errorMaxLengthPasswordCommunicate() {
    if (!password.value.length > 127 || password.value.length == 0) {
        return true;
    } else {
        return false;
    }
}

function LowerCasePasswordCheck() {
    const regex = /.*[a-z].*/;
    let check = regex.test(password.value);
    if (check == true || password.value.length == 0) {
        return true;
    } else {
        return false;
    }
}

function UpperCasePasswordCheck() {
    const regex = /.*[A-Z].*/;
    let check = regex.test(password.value);
    if (check == true || password.value.length == 0) {
        return true;
    } else {
        return false;
    }
}

function NumberPasswordCheck() {
    const regex = /.*[0-9].*/;
    let check = regex.test(password.value);
    if (check == true || password.value.length == 0) {
        return true;
    } else {
        return false;
    }
}

function SpecialCharPasswordCheck() {
    const regex = /.*[!@#\$%\^&\*]/;
    let check = regex.test(password.value);
    if (check == true || password.value.length == 0) {
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

function RegisterFormTotalDataCheck() {
    if (loginVisualValidation() &&
        emailVisualValidation() &&
        passwordVisualValidation() &&
        confirmPasswordVisualValidation()) {
        return true;
    }
}

const postData = async(x) => {

    const resp = await fetch('http://org.localhost/php/api/update.php', {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(x)
    });
    console.log(resp);
    return resp.json();

}


function parseJwt() {
    const token = getCookie('jwt');
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload).data.user_id;
};


async function sendData(e) {
    e.preventDefault();
    console.log(parseJwt());
    if (RegisterFormTotalDataCheck()) {
        const cookie = getCookie('jwt');
        const data = {
            USER_ID: parseJwt(),
            USER_LOGIN: document.getElementById('username').value,
            EMAIL: document.getElementById('email').value,
            USER_PASSWORD: document.getElementById('password').value,
            USER_CONFIRM_PASSWORD: document.getElementById('confirm_password').value,
            jwt: cookie

        }
        const resp = await postData(data);
        if (Apicheck(resp.message)) {
            window.location.replace("http://org.localhost/php/api/updateSuccess.php'");
        } else {
            errorInfoDbCheck.classList.remove('hide');
        }
    }

}

function Apicheck(message) {
    if (message == 'Unable to update user.' || message == 'Access denied.') {
        return false;
    } else {
        return true;
    }
}

submitButton.addEventListener('click', sendData);