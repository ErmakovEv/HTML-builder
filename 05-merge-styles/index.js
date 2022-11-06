const fs = require('fs');
const path = require('path');

let res = '';

async function collectInfo() {
  let targetDir = path.join(__dirname, 'styles');
  const data = await fs.promises.readdir(targetDir, {withFileTypes: true});
  for (let item of data) {
    const pathFile = path.join(__dirname, 'styles', item.name);
    if(item.isFile() && (path.extname(pathFile) === '.css')) {
      const contents = await fs.promises.readFile(pathFile, { encoding: 'utf8' });
      res += contents;
      res += '\n';
    }
  }
  writeStyles();
}

async function writeStyles() {
  let pathProject = path.join(__dirname, 'project-dist', 'bundle.css');
  const promise = fs.promises.writeFile(pathProject, res);
  await promise;
}

collectInfo();