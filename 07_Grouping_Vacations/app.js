// axios
const axios = require('axios');

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
    users.push(user);
  }

  console.log(JSON.stringify(users));
});
