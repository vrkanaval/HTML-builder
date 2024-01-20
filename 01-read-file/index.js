const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

const srcStream = fs.createReadStream(filePath);

srcStream.pipe(process.stdout);