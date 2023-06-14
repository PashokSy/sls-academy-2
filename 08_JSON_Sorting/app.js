// axios
const axios = require('axios');

const endpoints = [
  'https://jsonbase.com/sls-team/json-793',
  'https://jsonbase.com/sls-team/json-955',
  'https://jsonbase.com/sls-team/json-231',
  'https://jsonbase.com/sls-team/json-931',
  'https://jsonbase.com/sls-team/json-93',
  'https://jsonbase.com/sls-team/json-342',
  'https://jsonbase.com/sls-team/json-770',
  'https://jsonbase.com/sls-team/json-491',
  'https://jsonbase.com/sls-team/json-281',
  'https://jsonbase.com/sls-team/json-718',
  'https://jsonbase.com/sls-team/json-310',
  'https://jsonbase.com/sls-team/json-806',
  'https://jsonbase.com/sls-team/json-469',
  'https://jsonbase.com/sls-team/json-258',
  'https://jsonbase.com/sls-team/json-516',
  'https://jsonbase.com/sls-team/json-79',
  'https://jsonbase.com/sls-team/json-706',
  'https://jsonbase.com/sls-team/json-521',
  'https://jsonbase.com/sls-team/json-350',
  'https://jsonbase.com/sls-team/json-64',
];

function findValue(object, key) {
  if (Object.hasOwn(object, key)) {
    // object has needed key on fist level
    return object[key];
  } else {
    // needed key is nested
    if (object instanceof Array) {
      for (let i = 0; i < object.length; i++) {
        const value = findValue(object[i], key);
        if (value != undefined) return value;
      }
    }
    if (object instanceof Object) {
      for (property in object) {
        const value = findValue(object[property], key);
        if (value != undefined) return value;
      }
    }
  }
}

async function request(endpoint, requestAttempts, requestAttemptsCount = 0) {
  return await axios({
    method: 'get',
    url: endpoint,
  })
    .then((response) => {
      const responseData = response.data;
      const isDone = findValue(responseData, 'isDone');
      return '\033[32m [Success] \033[0m' + `${endpoint}: isDone - ${isDone}`;
    })
    .catch((error) => {
      if (requestAttemptsCount >= requestAttempts) {
        return (
          '\033[33m [Fail] \033[0m' + `${endpoint}: The endpoint is unavailable`
        );
      } else {
        requestAttemptsCount++;
        return request(endpoint, requestAttempts, requestAttemptsCount);
      }
    });
}

async function logMessages() {
  for (let i = 0; i < endpoints.length; i++) {
    const message = await request(endpoints[i], 3);
    console.log(message);
  }
}

logMessages();
