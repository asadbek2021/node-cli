import fs from 'fs/promises';
import path from 'path';
import inquirer from 'inquirer';
import { input } from '@inquirer/prompts';

import { Measurement, Product, ProductType } from "./types";

const url = path.join(process.cwd(),'db','db.json');

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

export async function getProduct(): Promise<Product> {
    const rawProduct =  await inquirer.prompt([
        {
            name: 'type',
            type: 'list',
            message: 'Select product type:',
            choices: [ProductType.IceCream, ProductType.SoftDrink]  
        },
        {
            name: 'name',
            message: 'Product name:',
            validate: value => value.length >= 3,
        }
      ]);
    const [unity, measureType] = getUnity(rawProduct.type);
    const measure =  await input({
        message: `Product ${measureType} in ${unity}:`,
        validate: (value) => !!value.length && !isNaN(+value),
    });
    const productMeasure = getMeasurement(rawProduct.type, +measure);
    return {
        ...rawProduct,
        ...productMeasure
    };
}

export async function saveToDb(products: Product[]) {
    await fs.writeFile(url, JSON.stringify(products));
}

export async function getProductList(): Promise<Product[]> {
    const productList = await fs.readFile(url, {encoding: 'utf-8'}).then(data => JSON.parse(data));
    return productList;
}