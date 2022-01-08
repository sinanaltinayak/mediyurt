export class Room{
    name!: string;
    maxCapacity!: number;
    description!: string;
    price!: number;
    status!: boolean;
    currentCapacity!: number;
    isFull: boolean;

    constructor(name: string, maxCapacity: number, description: string, price: number, status: boolean, currentCapacity: number, isFull: boolean) {
        this.name = name;
        this.maxCapacity = maxCapacity;
        this.description = description;
        this.price = price;
        this.status = status;
        this.currentCapacity = currentCapacity;
        this.isFull = isFull;
    }
}