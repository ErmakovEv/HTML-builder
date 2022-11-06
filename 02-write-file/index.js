const fs = require('fs');
const path = require('path');

const { stdin, stdout } = process;
const pathText = path.join(__dirname, 'text.txt');

console.log('Введите текст');
const output = fs.createWriteStream(pathText);


process.on('SIGINT', function(data) {
  console.log('\nУдачи!');
  process.exit();
});

stdin.on('data', data => {
  if(data.toString() === 'exit\n') {
    console.log('Удачи!');
    process.exit();
  } 
  output.write(data);
});