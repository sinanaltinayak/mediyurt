export class Payment{
    studentID!: string;
    roomID!: string;
    price!: number;
    date!: string;
    status!: string;

    constructor(studentID: string, roomID: string,  price: number, date: string, status: string) {
        this.studentID = studentID;
        this.roomID = roomID;
        this.price = price;
        this.date = date;
        this.status = status;
    }
}