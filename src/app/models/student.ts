export class Student{
    //id!: string;
    fullname!: string;
    number!: number;
    currentRoomID!: string;
    username!: string;
    password!: string;

    constructor(fullname: string, number: number, currentRoomID: string, username: string, password: string) {
        //this.id = id && id || "";
        this.fullname = fullname;
        this.number = number;
        this.currentRoomID = currentRoomID;
        this.username = username;
        this.password = password;
    }
}