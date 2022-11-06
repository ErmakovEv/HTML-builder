const fs = require('fs');
const path = require('path');

async function createDir() {
  const pathDir = path.join(__dirname, 'project-dist');
  const copyDir = await fs.promises.mkdir(pathDir, { recursive: true });
}

async function readTemplate() {
  const pathTmp = path.join(__dirname, 'template.html');
  const contents = await fs.promises.readFile(pathTmp, { encoding: 'utf8' });
  changeData(contents);
}

async function foo(path) {
  const data = await fs.promises.readFile(path, { encoding: 'utf8' });
  return data;
}

async function changeData(data) {
  const arrHTMLfiles = [];
  const pathComponents = path.join(__dirname, 'components');
  const arrDirent = await fs.promises.readdir(pathComponents, {withFileTypes: true});
  for(let item of arrDirent) {
    let pathFile = path.join(pathComponents, item.name);
    const data = await foo(pathFile);
    arrHTMLfiles.push({
      name: item.name = path.basename(pathFile, path.extname(pathFile)),
      path: pathFile,
      content: data,
    });
  }
  arrHTMLfiles.forEach(obj => {
    data = data.replace(`{{${obj.name}}}`, obj.content);
  });

  writeHTML(data);

  // const pathHead = path.join(__dirname, 'components', 'header.html');
  // const pathArc = path.join(__dirname, 'components', 'articles.html');
  // const pathFoot = path.join(__dirname, 'components', 'footer.html');

  // const contentHeader = await fs.promises.readFile(pathHead, { encoding: 'utf8' });
  // const contentArcticles = await fs.promises.readFile(pathArc, { encoding: 'utf8' });
  // const contentFooter = await fs.promises.readFile(pathFoot, { encoding: 'utf8' });
  // data = data.replace("{{header}}", contentHeader);
  // data = data.replace("{{articles}}", contentArcticles);
  // data = data.replace("{{footer}}", contentFooter);
  // writeHTML(data);
}

async function writeHTML(data) {
  let pathHTML = path.join(__dirname, 'project-dist', 'index.html');
  const promise = fs.promises.writeFile(pathHTML, data);
  await promise;
}

async function collectStyle() {
  let res = '';
  let targetDir = path.join(__dirname, 'styles');
  const data = await fs.promises.readdir(targetDir, { withFileTypes: true });
  for (let item of data) {
    const pathFile = path.join(__dirname, 'styles', item.name);
    if (item.isFile() && (path.extname(pathFile) === '.css')) {
      const contents = await fs.promises.readFile(pathFile, { encoding: 'utf8' });
      res += contents;
      res += '\n';
    }
  }
  writeStyles(res);
}

async function writeStyles(res) {
  let pathProject = path.join(__dirname, 'project-dist', 'style.css');
  const promise = fs.promises.writeFile(pathProject, res);
  await promise;
}

async function clearDir(pathCopy) {
  const arrOfobj = await fs.promises.readdir(pathCopy, {withFileTypes: true});
  for (let obj of arrOfobj) {
    if (obj.isFile()) {
      await fs.promises.rm(path.join(pathCopy, obj.name));
    }
  }
}

async function myCopy(pathOrginal, pathCopy) {
  const copyDir = await fs.promises.mkdir(pathCopy, { recursive: true });
  await clearDir(pathCopy);
  const arrOfobj = await fs.promises.readdir(pathOrginal, { withFileTypes: true });
  for (let obj of arrOfobj) {
    if (obj.isFile()) {
      const pathOrgFile = path.join(pathOrginal, obj.name);
      const pathCopyFile = path.join(pathCopy, obj.name);
      await fs.promises.copyFile(pathOrgFile, pathCopyFile);
    }
    else if(obj.isDirectory()) {
      myCopy(path.join(pathOrginal, obj.name), path.join(pathCopy, obj.name));
    }
  }
}

function main() {
  createDir();
  readTemplate();
  collectStyle();
  myCopy(path.join(__dirname, 'assets'), path.join(__dirname,'project-dist','assets'));
}

main();