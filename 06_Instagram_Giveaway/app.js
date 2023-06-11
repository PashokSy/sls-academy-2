const { count } = require('console');
const { readFileSync } = require('fs');
const { connect } = require('http2');

// measure elapsed time
let startTime, endTime;
function start() {
  startTime = performance.now();
}
function end() {
  endTime = performance.now();
  const timeDiff = (endTime - startTime) / 1000;
  console.log(`\nElapsed time - ${timeDiff} seconds`);
}

function getSortedArrays() {
  let arr = new Array();
  for (i = 0; i < 20; i++) {
    const path = './static/out' + i + '.txt';
    const data = readFileSync(path).toString().split('\n');
    console.log('file ' + path);
    arr.push(data.sort());
  }
  return arr;
}

function uniqueValues() {
  let wordsSet = new Set();
  for (i = 0; i < 20; i++) {
    const path = './static/out' + i + '.txt';
    const data = readFileSync(path).toString().split('\n');
    data.forEach((word) => wordsSet.add(word));
  }
  return wordsSet.size;
}

function existInAllFiles() {
  let count = 0;

  let arr = new Array();
  for (i = 0; i < 20; i++) {
    const path = './static/out' + i + '.txt';
    const data = readFileSync(path).toString().split('\n');
    arr.push(data);
  }

  return count;
}

start();

let uniqueValuesCount = uniqueValues();
console.log('uniqueValues() = ' + uniqueValuesCount);

let existInAllFilesCount = existInAllFiles();
console.log('existInAllFiles() = ' + existInAllFilesCount);

end();
