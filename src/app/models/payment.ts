export class Payment{
    studentName!: string;
    currentRoom!: string;
    price!: number;
    date!: string;
    isPaid!: boolean;

    constructor(studentName: string, currentRoom: string,  price: number, date: string, isPaid: boolean) {
        this.studentName = studentName;
        this.currentRoom = currentRoom;
        this.price = price;
        this.date = date;
        this.isPaid = isPaid;
    }
}