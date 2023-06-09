const { readFile } = require('fs');

function getFilesPaths() {
  let filesPaths = [];
  for (i = 0; i < 20; i++) {
    const path = './static/out' + i;
    filesPaths.push(path);
  }
  return filesPaths;
}
