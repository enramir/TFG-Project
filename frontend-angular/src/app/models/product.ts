export class Product{
    // public name: string;
    // public image: string;
    // public description: string;
    // public price: number;

    // constructor(name, available, description, price){
    //     this.name = name;
    //     this.image = image;
    //     this.description = description;
    //     this.price = price;
    // }

    constructor(
        public name: string,
        public description: string,
        public price: number,
        public image: string,
    ){}
}