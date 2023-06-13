// axios
const axios = require('axios');
// write file
const { writeFileSync } = require('fs');

axios({
  method: 'get',
  url: 'https://jsonbase.com/sls-team/vacations',
}).then((response) => {
  let users = [];
  const responseData = response.data;

  // loop through original json
  for (i = 0; i < responseData.length; i++) {
    let user = {
      userId: responseData[i].user._id,
      userName: responseData[i].user.name,
      vacations: [
        {
          startDate: responseData[i].startDate,
          endDate: responseData[i].endDate,
        },
      ],
    };

    // check if new json already contain user
    let foundIndex = users.findIndex((item) => item.userId === user.userId);
    if (foundIndex > -1) {
      // user already exists in result array
      // check if original json have a multiple entries of same vacations days
      let found = users[foundIndex].vacations.find(
        (vacation) =>
          vacation.startDate === user.vacations[0].startDate &&
          vacation.endDate === user.vacations[0].endDate
      );
      if (!found) {
        // user already have same vacations days
        users[foundIndex].vacations.push(user.vacations[0]);
      }
    } else {
      // user not exists in result array
      users.push(user);
    }
  }

  writeFileSync('result.json', JSON.stringify(users, null, 2));
});
