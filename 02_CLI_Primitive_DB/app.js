import inquirer from 'inquirer';
import { readFileSync, writeFileSync } from 'fs';

const saveData = (data) => {
  try {
    writeFileSync('./db/users.txt', `\n${JSON.stringify(data)}`, {
      flag: 'a',
    });
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

const printData = () => {
  try {
    const data = readFileSync('./db/users.txt', 'utf-8');
    console.log(JSON.parse('[' + data.replace(/\n/g, ',') + ']'));
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

const searchData = (username) => {
  try {
    const data = readFileSync('./db/users.txt', 'utf-8');
    const jsonData = JSON.parse('[' + data.replace(/\n/g, ',') + ']');
    let found = false;
    let users = [];
    for (var i = 0; i < jsonData.length; i++) {
      if (jsonData[i].username.toLowerCase() == username.toLowerCase()) {
        found = true;
        users.push(jsonData[i]);
      }
    }
    if (found) {
      console.log(`User ${username} was found.`);
      console.log(users);
    } else {
      console.log(`User ${username} was not found.`);
    }
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

function addUser() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Enter your username ( To cancel press ENTER button ): ',
        name: 'username',
      },
      {
        type: 'confirm',
        message: 'Would you like to search values in DB?: ',
        name: 'showValues',
        when: (answers) => answers.username.trim() === '',
      },
      {
        type: 'list',
        message: 'Chose your gender: ',
        name: 'gender',
        choices: ['male', 'female', 'other'],
        when: (answers) => answers.username.trim() !== '',
      },
      {
        type: 'number',
        message: 'Enter your age: ',
        name: 'age',
        filter: (input) => {
          if (isNaN(input)) {
            return 'unknown';
          }
          return input;
        },
        when: (answers) => answers.username.trim() !== '',
      },
    ])
    .then((answer) => {
      if (answer.showValues) {
        console.log(answer.showValues);
        printData();
        inquirer
          .prompt([
            {
              type: 'input',
              message: 'Enter username you want to find in DB: ',
              name: 'search',
            },
          ])
          .then((answer) => {
            searchData(answer.search);
          });
      } else if (answer.showValues === false) {
        process.exit(0);
      } else {
        saveData(answer);
        addUser();
      }
    });
}

addUser();
