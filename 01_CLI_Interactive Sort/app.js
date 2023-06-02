const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  'Enter few words or numbers separated by space (If You want to exit, enter "exit"): ',
  (answer) => {
    if (answer.trim() === 'exit') {
      rl.close();
    } else if (answer.trim() === '') {
      rl.prompt();
    } else {
      const inputArray = answer.split(' ');
      console.log(
        'Chose what operation to do with words and numbers (If You want to exit, enter "exit"). \n' +
          '1. Sort words alphabetically \n' +
          '2. Show numbers from lesser to greater \n' +
          '3. Show numbers from bigger to smaller \n' +
          '4. Display words in ascending order by number of letters in the word \n' +
          '5. Show only unique words \n' +
          '6. Display only unique values from the set of words and numbers entered'
      );
      rl.setPrompt('\nEnter option number (1-6):');
      rl.prompt();
      rl.on('line', (input) => {
        if (input.trim() === 'exit') {
          rl.close();
        } else if (input.trim() === '1') {
          console.log('Here is your words sorted alphabetically:');
          console.log(inputArray.sort());
          rl.prompt();
        } else if (input.trim() === '2') {
          console.log('Here is your numbers from lesser to greater:');
          rl.prompt();
        } else if (input.trim() === '3') {
          console.log('Here is your numbers from bigger to smaller:');
          rl.prompt();
        } else if (input.trim() === '4') {
          console.log(
            'Here is your words in ascending order by number of letters in the word:'
          );
          rl.prompt();
        } else if (input.trim() === '5') {
          console.log('Here is unique words:');
          rl.prompt();
        } else if (input.trim() === '6') {
          console.log(
            'Here is only unique values from the set of words and numbers entered:'
          );
          rl.prompt();
        } else {
          console.log('Enter "exit" to close the program');
        }
      });
    }
  }
);

rl.on('close', () => {
  console.log('\nGoodbye. Have a great day!');
  process.exit(0);
});
