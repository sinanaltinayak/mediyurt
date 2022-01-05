export class Manager{
    fullname!: string;
    username!: string;
    password!: string;

    constructor(fullname: string, username: string, password: string) {
        this.fullname = fullname;
        this.username = username;
        this.password = password;
    }
}