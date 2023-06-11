const { readFileSync } = require('fs');

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

function uniqueValues() {
  // count all unique values in all files
  let wordsSet = new Set();
  for (i = 0; i < 20; i++) {
    const path = './static/out' + i + '.txt';
    const data = readFileSync(path).toString().split('\n');
    data.forEach((word) => wordsSet.add(word));
  }
  return wordsSet.size;
}

function getArrayOfArrays() {
  // get all words from files in array of arrays
  let arrayOfArrays = new Array();
  for (i = 0; i < 20; i++) {
    const path = './static/out' + i + '.txt';
    const data = readFileSync(path).toString().split('\n');
    arrayOfArrays.push(data);
  }
  return arrayOfArrays;
}

function getDictionaryOfEntries() {
  // count all entries in all files and put it in a dictionary
  const arrayOfArrays = getArrayOfArrays();
  let dictionaryOfEntries = {};
  let element, count;
  for (i = 0; i < arrayOfArrays.length; i++) {
    for (j = 0; j < arrayOfArrays[i].length; j++) {
      element = arrayOfArrays[i][j];
      count = dictionaryOfEntries[element] || 0;
      if (count == i) {
        dictionaryOfEntries[element] = count + 1;
      }
    }
  }
  return dictionaryOfEntries;
}

// const dictionaryOfEntries out of functions for better performance
const dictionaryOfEntries = getDictionaryOfEntries();

function existInAllFiles() {
  // count all values that exists in all 20 files
  let count = 0;

  for (element in dictionaryOfEntries) {
    if (dictionaryOfEntries[element] === 20) count++;
  }

  return count;
}

function existInAtleastTen() {
  // count all values that exists in at least 10 files
  let count = 0;

  for (element in dictionaryOfEntries) {
    if (dictionaryOfEntries[element] >= 10) count++;
  }

  return count;
}

// get all values for task and count elapsed time
start();

let uniqueValuesCount = uniqueValues();
console.log('uniqueValues() = ' + uniqueValuesCount);

let existInAllFilesCount = existInAllFiles();
console.log('existInAllFiles() = ' + existInAllFilesCount);

let existInAtleastTenCount = existInAtleastTen();
console.log('existInAtleastTen() = ' + existInAtleastTenCount);

end();
