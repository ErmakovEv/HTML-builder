const path = require('path');
const fs = require('fs');

const pathOrginal = path.join(__dirname, 'files');
const pathCopy = path.join(__dirname, 'files-copy');


// --------------------Без рекурсии ------------------------
// async function clearDir(pathCopy) {
//   const arrOfobj = await fs.promises.readdir(pathCopy, {withFileTypes: true});
//   for (let obj of arrOfobj) {
//     await fs.promises.rm(path.join(pathCopy, obj.name));
//   }
// }

// async function myCopy() {
//   const copyDir = await fs.promises.mkdir(pathCopy, { recursive: true });
//   await clearDir(pathCopy);
//   const arrOfobj = await fs.promises.readdir(pathOrginal, {withFileTypes: true});
//   for (let obj of arrOfobj) {
//     if(obj.isFile()) {
//       const pathOrgFile = path.join(pathOrginal, obj.name);
//       const pathCopyFile = path.join(pathCopy, obj.name);
//       await fs.promises.copyFile(pathOrgFile, pathCopyFile);
//     }
//   }
// }

// myCopy();

// --------------------C рекурсией ------------------------
myCopy(pathOrginal, pathCopy);

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

