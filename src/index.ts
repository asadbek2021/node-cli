#!/usr/bin/env node
import fs from 'fs/promises';
import { input } from '@inquirer/prompts';

import { exitProcess, getProduct, getProductList, saveToDb } from './helpers';
import { commands } from './commands';
import { Product } from './types';


async function cli() {
   try {
    const productList = await getProductList();
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
          await saveToDb(productList);
          console.log('Product Added', product);
          break;
        case commands.showList:
          console.log('Product List:', productList);
          break;
        case commands.exit:
          exitProcess(0);
      }
    }
    cli();
   } catch(error) {
    console.error(error);
    exitProcess(1);
   }
}

cli();