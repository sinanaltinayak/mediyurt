export class Application{
    type!: string;
    studentID!: string;
    currentRoomID!: string;
    appliedRoomID!: string;
    date!: string;
    note!: string;

    constructor(type: string, studentID: string, currentRoomID: string, appliedRoomID: string, date: string, note: string) {

        this.type = type;
        this.studentID = studentID;
        this.currentRoomID = currentRoomID;
        this.appliedRoomID = appliedRoomID;
        this.date = date;
        this.note = note;
    }
}