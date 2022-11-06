const fs = require('fs');
const path = require('path');

const arr = [];
async function collectInfo() {
  let targetDir = path.join(__dirname, 'secret-folder');
  const data = await fs.promises.readdir(targetDir, {withFileTypes: true});
  for (let item of data) {
    if(item.isFile()) {
      const pathFile = path.join(__dirname, 'secret-folder', item.name);
      const obj = {};
      obj.extname = path.extname(pathFile);
      obj.name = path.basename(pathFile, obj.extname);
      obj.path = pathFile;
      const stat = await fs.promises.stat(obj.path);
      obj.size = stat.size;
      arr.push(obj);
    }
  }
  print();
}

function print() {
  for(let i of arr) {
    console.log(`${i.name} - ${i.extname.slice(1)} - ${i.size}b`);
  }
}

collectInfo();