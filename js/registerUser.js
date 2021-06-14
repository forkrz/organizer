export class RegisterUser {
    constructor() {
        this.data = {
            user_login: document.getElementById('username').value,
            email: document.getElementById('email').value,
            user_password: document.getElementById('password').value,
        };
    }
    validateRegistrationData() {
        return true
    }

    sendData() {
        console.log(document.getElementById('username').value);
        fetch('http://org.localhost/php/api/create.php', {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(this.data)
        }).then(res => res.json()).then(res => {
            console.log("Dodałem użytkownika:");
            console.log(res);
        })

    }
}