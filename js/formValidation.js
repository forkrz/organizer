export class formValidation {
    constructor() {
        this.login = document.getElementById('username').value;
        this.email = document.getElementById('email').value;
        this.user_password = document.getElementById('password').value;
        this.password_confirmation = document.getElementById('confirm_password').value;
    }

    loginCheck() {
        if (this.login.length < 6 || this.login.length > 14) {
            return false;
        }
    }

    validEmail() {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(ths.email)) {
            return true;
        } else {
            return false;
        };
        console.log(this.email);
    };


}