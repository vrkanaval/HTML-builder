const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'text.txt');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const writableStream = fs.createWriteStream(filePath, {flags: 'a', encoding:'utf8'});
console.log('Welcome! Please enter a text for writing to the file.');

rl.on('line', (input) => {
    if (input.trim() === 'exit') {
        process.exit();
    }
    else {
        writableStream.write(input + '\n');
    }
});

process.on('exit', () => {
    console.log('Thank you! Goodbye.');
});