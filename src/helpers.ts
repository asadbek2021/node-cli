export const productList: Product[] = [];

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

export function getUnity(type: ProductType): [Measurement, string] {
    switch(type) {
        case ProductType.IceCream:
            return [Measurement.Gramms, 'weight'];
        case ProductType.SoftDrink:
            return [Measurement.Liters, 'volume'];
    }
};

export function getMeasurement(type: ProductType, measure: number) {
    switch(type) {
        case ProductType.IceCream:
            return {weight: measure};
        case ProductType.SoftDrink:
            return {volume: measure};
    }
};