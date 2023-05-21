#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { Product, ProductType, getMeasurement, getUnity } from './helpers';
import { commands } from './commands';
import { input } from '@inquirer/prompts';
import inquirer from 'inquirer';


async function cli() {
    const url = path.join(process.cwd(),'db','db.json');
    const productList: Product[] = await fs.readFile(url, {encoding: 'utf-8'}).then(data => JSON.parse(data));
    const command = await input({
        message: 'Feel free to write commands:',
    })
    if(!Object.values(commands).includes(command)){
        console.error(`Provided incorrect command: ${command}`);
    } else{
      switch(command) {
        case commands.addProduct:
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
          const product: Product = {
            ...rawProduct,
            ...productMeasure
          };
          productList.push(product);
          await fs.writeFile(url, JSON.stringify(productList));
          console.log('Product Added');
          console.log(product);
          break;
        case commands.showList:
          console.log('Product List:', productList);
          break;
        case commands.exit:
            process.exitCode = 0;
            process.exit();
      }
    }
    cli();
}

cli();