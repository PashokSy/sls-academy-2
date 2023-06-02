const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// get data from user
rl.question(
  'Enter few words or numbers separated by space (If You want to exit, enter "exit"): ',
  (answer) => {
    if (answer.trim() === 'exit') {
      rl.close();
    } else {
      // parse input to array
      const inputArray = answer.split(' ');
      // select only string from array
      const stringArray = inputArray.filter((element) => isNaN(element));
      // select only numbers from array
      const numbersArray = inputArray.filter(Number);

      // ask to chose how to process the data
      console.log(
        'Chose what operation to do with words and numbers (If You want to exit, enter "exit"). \n' +
          '1. Sort words alphabetically \n' +
          '2. Show numbers from lesser to greater \n' +
          '3. Show numbers from bigger to smaller \n' +
          '4. Display words in ascending order by number of letters in the word \n' +
          '5. Show only unique words \n' +
          '6. Display only unique values from the set of words and numbers entered'
      );
      // repeat asking how to process the data, until user close the app
      rl.setPrompt('\nEnter option number (1-6):');
      rl.prompt();
      rl.on('line', (input) => {
        if (input.trim() === 'exit') {
          rl.close();
        } else if (input.trim() === '1') {
          console.log('Here is your words sorted alphabetically:');
          // simple js sort will sort words alphabetically
          console.log(stringArray.sort());
          rl.prompt();
        } else if (input.trim() === '2') {
          console.log('Here is your numbers from lesser to greater:');
          // correcting sort for numbers
          console.log(
            numbersArray.sort((a, b) => {
              return a - b;
            })
          );
          rl.prompt();
        } else if (input.trim() === '3') {
          3;
          console.log('Here is your numbers from bigger to smaller:');
          // correcting sort for numbers in descend order
          console.log(
            numbersArray.sort((a, b) => {
              return b - a;
            })
          );
          rl.prompt();
        } else if (input.trim() === '4') {
          console.log(
            'Here is your words in ascending order by number of letters in the word:'
          );
          // add 'length' param to sort by number of letters
          console.log(
            stringArray.sort((a, b) => {
              return a.length - b.length;
            })
          );
          rl.prompt();
        } else if (input.trim() === '5') {
          console.log('Here is unique words:');
          // filter will check if its only one occurrence of value in the array
          console.log(
            // use for array excluded from numbers
            stringArray.filter((value, index, array) => {
              return array.indexOf(value) === index;
            })
          );
          rl.prompt();
        } else if (input.trim() === '6') {
          console.log(
            'Here is only unique values from the set of words and numbers entered:'
          );
          // filter will check if its only one occurrence of value in the array
          console.log(
            // use for whole input array
            inputArray.filter((value, index, array) => {
              return array.indexOf(value) === index;
            })
          );
          rl.prompt();
        } else {
          // if input not 'exit' and incorrect
          console.log('( Enter "exit" to close the program )');
          rl.prompt();
        }
      });
    }
  }
);

// exit program any time readline process is stopped
rl.on('close', () => {
  console.log('\nGoodbye. Have a great day!');
  process.exit(0);
});
