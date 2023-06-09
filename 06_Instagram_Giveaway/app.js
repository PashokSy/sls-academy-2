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
  let wordsSet = new Set();
  for (i = 0; i < 20; i++) {
    const path = './static/out' + i + '.txt';
    const data = readFileSync(path).toString().split('\n');
    data.forEach((word) => wordsSet.add(word));
  }
  return wordsSet.size;
}

start();

let uniqueValuesCount = uniqueValues();
console.log('uniqueValues() = ' + uniqueValuesCount);

end();
