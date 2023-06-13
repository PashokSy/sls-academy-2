// axios
const axios = require('axios');
// write file
const { writeFileSync } = require('fs');

class User {
  constructor(userId, userName, vacations) {
    (this.userId = userId), this.userName;
  }
}

axios({
  method: 'get',
  url: 'https://jsonbase.com/sls-team/vacations',
}).then((response) => {
  let users = [];
  const responseData = response.data;

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

    let foundIndex = users.findIndex((item) => item.userId === user.userId);
    if (foundIndex > -1) {
      users[foundIndex].vacations.push(user.vacations[0]);
    } else {
      users.push(user);
    }
  }

  writeFileSync('result.json', JSON.stringify(users, null, 2));
});
