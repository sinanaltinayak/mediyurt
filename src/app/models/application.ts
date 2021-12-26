export class Application{
    id!: number;
    type!: string;
    studentName!: string;
    currentRoom!: string;
    appliedRoom!: string;
    date!: Date;
    note!: string;

    constructor(id: number, type: string, studentName: string, currentRoom: string, appliedRoom: string, date: Date, note: string) {
        this.id = id;
        this.type = type;
        this.studentName = studentName;
        this.currentRoom = currentRoom;
        this.appliedRoom = appliedRoom;
        this.date = date;
        this.note = note;
    }
}