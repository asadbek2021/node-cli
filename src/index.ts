#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { input } from '@inquirer/prompts';

import { getProduct } from './helpers';
import { commands } from './commands';
import { Product } from './types';


async function cli() {
   try {
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
          const product = await getProduct();
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
   } catch(error) {
    console.error(error);
    process.exitCode = 0;
    process.exit();
   }
}

cli();