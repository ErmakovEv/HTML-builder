const fs = require('fs');
const path = require('path');
const pathText = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(pathText, 'utf-8');
readableStream.on('data', chunk => process.stdout.write(chunk));


