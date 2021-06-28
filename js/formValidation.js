export class formValidation {
    constructor() {
        this.login = document.getElementById('username');
        this.email = document.getElementById('email');
        this.user_password = document.getElementById('password');
        this.password_confirmation = document.getElementById('confirm_password');
    }

    loginCheck() {
        if (this.login.length > 6 || this.login.length < 14) {
            return true
        } else {
            return false
        }
    }
}