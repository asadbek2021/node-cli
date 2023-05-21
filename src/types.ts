export interface Product {
    type: ProductType;
    name: string;
    weight?: number;
    volume?: number;
}

export enum Measurement{
    Liters='liters',
    Gramms='gramms',
}


export const enum ProductType {
    IceCream="ice cream",
    SoftDrink="soft drink"
}