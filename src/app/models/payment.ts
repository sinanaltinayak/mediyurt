export class Payment{
    id!: number;
    studentName!: string;
    currentRoom!: string;
    price!: number;
    date!: Date;
    isPaid!: boolean;

    constructor(id: number, studentName: string, currentRoom: string,  price: number, date: Date, isPaid: boolean) {
        this.id = id;
        this.studentName = studentName;
        this.currentRoom = currentRoom;
        this.price = price;
        this.date = date;
        this.isPaid = isPaid;
    }
}