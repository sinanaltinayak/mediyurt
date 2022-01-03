export class Room{
    name!: string;
    imagePath!: string;
    maxCapacity!: number;
    description!: string;
    price!: number;
    status!: boolean;
    currentCapacity!: number;

    constructor(name: string, imagePath: string, maxCapacity: number, description: string, price: number, status: boolean, currentCapacity: number) {
        this.name = name;
        this.imagePath = imagePath;
        this.maxCapacity = maxCapacity;
        this.description = description;
        this.price = price;
        this.status = status;
        this.currentCapacity = currentCapacity;
    }
}