#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';

const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 2000);
    })
}

async function welcome() {
    let pulseAnimation = chalkAnimation.rainbow('Welcome to Your Word Counter Application');
    await sleep();
    pulseAnimation.stop();
    console.log(chalk.red(`

                                           888                                              888
                                           888                                              888
                                           888                                              888
888  888  888    .d88b.    888d888     .d88888   .d8888b    .d88b.    888  888   88888b.    888888   .d88b.   888d888 
888  888  888   d88""88b   888P"      d88" 888   d88P"     d88""88b   888  888   888 "88b   888     d8P  Y8b  888P"   
888  888  888   888  888   888       888   888  888       888    888  888  888   888  888   888     88888888  888     
Y88b 888 d88P   Y88..88P   888       Y88b  888  Y88b.      Y88..88P   Y88b 888   888  888   Y88b.   Y8b.      888     
"Y8888888P"      "Y88P"    888         "Y88888   "Y8888P    "Y88P"     "Y88888   888  888    "Y888   "Y8888   888     
                                                             
                                                             
 `))
}

await welcome();

const counter = (paragraph: string) => {
    const charCount = paragraph.replace(/\s/g, "").length;
    const wordCount = paragraph.split(/\s+/).filter(word => word.length > 0).length;
    const numericCount = paragraph.replace(/\D/g, "").length;
    const spaceCount = paragraph.split(" ").length - 1; // Count spaces by splitting on space and subtracting 1
    return `Word Count: ${chalk.bold.bgYellow(wordCount)}\nCharacter Count: ${chalk.bold.redBright(charCount)}\nNumeric Character Count: ${chalk.bold.redBright(numericCount)}\nSpace Count: ${chalk.bold.redBright(spaceCount)}`;
}

async function startWordCounter(counter: (text: string) => string) {
    do {
        let res = await inquirer.prompt({
            type: "input",
            message: chalk.bold.bgGrey("Write your paragraph here : "),
            name: "paragraph"
        })
        console.log(counter(res.paragraph))

        const { continueApp } = await inquirer.prompt({
            type: 'confirm',
            name: 'continueApp',
            message: chalk.bold.bgGrey('Do you want to continue or Exit ?'),
            default: true,
        });

        if (!continueApp) {
            console.log('Exiting the application.');
            break;
        }
    }
    while (true)
}

startWordCounter(counter);
