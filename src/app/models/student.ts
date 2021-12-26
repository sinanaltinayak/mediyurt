export class Student{
    id!: number;
    name!: string;
    number!: number;
    currentRoomID!: number;

    constructor(id: number, name: string, number: number, currentRoomID: number) {
        this.id = id;
        this.name = name;
        this.number = number;
        this.currentRoomID = currentRoomID;
    }
}