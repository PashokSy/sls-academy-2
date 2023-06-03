import inquirer from 'inquirer';

let user;

// ask username
inquirer
  .prompt([
    {
      type: 'input',
      message:
        'Enter your username ( If you want to exit press ENTER button ): ',
      name: 'username',
      validate: (answer) => {
        if (!answer) {
          exitProgram();
        }
        return true;
      },
    },
    {
      type: 'list',
      message: 'Chose your gender: ',
      name: 'gender',
      choices: ['male', 'female', 'other'],
    },
    {
      type: 'number',
      message: 'Enter your age: ',
      name: 'age',
    },
  ])
  .then((answer) => {
    console.log(answer);
  });

// exit program sequence
function exitProgram() {
  console.log('\nGoodbye. Have a great day!');
  process.exit(0);
}
