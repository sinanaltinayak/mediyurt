export class Application{
    type!: string;
    studentID!: string;
    currentRoomID!: string;
    appliedRoomID!: string;
    dateSent!: string;
    dateReturned!: string;
    note!: string;
    status!: string;

    constructor(type: string, studentID: string, currentRoomID: string, appliedRoomID: string, dateSent: string, dateReturned: string, note: string, status: string) {

        this.type = type;
        this.studentID = studentID;
        this.currentRoomID = currentRoomID;
        this.appliedRoomID = appliedRoomID;
        this.dateSent = dateSent;
        this.dateReturned = dateReturned;
        this.note = note;
        this.status = status;
    }
}