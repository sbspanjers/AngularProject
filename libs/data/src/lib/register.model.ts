export class RegisterModel {
    username = '';
    emailAddress = '';
    password = '';

    constructor(username = '', emailAddress = '', password = '') {
        this.username = username;
        this.emailAddress = emailAddress;
        this.password = password;
    }
}