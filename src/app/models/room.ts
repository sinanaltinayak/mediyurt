export class Room{
    id!: number;
    name!: string;
    imagePath!: string;
    capacity!: number;
    description!: string;
    price!: number;
    status!: number;

    constructor(id: number, name: string, imagePath: string, capacity: number, description: string, price: number, status: number) {
        this.id = id;
        this.name = name;
        this.imagePath = imagePath;
        this.capacity = capacity;
        this.description = description;
        this.price = price;
        this.status = status;
    }
}