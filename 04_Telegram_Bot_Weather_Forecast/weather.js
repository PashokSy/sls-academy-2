// axios
const axios = require('axios');
const APIkey = 'b1fb353e3de39ab27650342adb996283';
// Zhovti Vody GPS
const lat = '48.3441';
const lon = '33.5245';
// months and days arrays
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

async function getHoursInterval(stamp) {
  // stamp 1 for interval of 3 hours
  let interval = stamp === 1 ? '3' : '6';
  // stamp 2 for interval of 6 hours
  let message = `Weather in Zhovti Vody (interval is ${interval} hours): \n`;
  let prevDay;
  let prevMonth;
  let prevDate;

  await axios({
    method: 'get',
    url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`,
  }).then((apiResponse) => {
    const weather = apiResponse.data;
    for (let i = 0; i < weather.list.length - 1; i += stamp) {
      let dateTimeStamp = weather.list[i].dt;
      let dateTime = new Date(dateTimeStamp * 1000);
      let day = days[dateTime.getDay()];
      let month = months[dateTime.getMonth()];
      let date = dateTime.getDate();
      if (day !== prevDay || month !== prevMonth || date !== prevDate) {
        message += `\n${day}, ${month} ${date}: \n`;
      }

      // prettier time numbers
      let hours =
        dateTime.getHours() < 10
          ? '0' + dateTime.getHours()
          : dateTime.getHours();
      let mins =
        dateTime.getMinutes() < 10
          ? '0' + dateTime.getMinutes()
          : dateTime.getMinutes();

      // prettier temperature numbers
      let temp;
      if (Math.round(weather.list[i].main.temp) > 0) {
        temp = '+' + Math.round(weather.list[i].main.temp);
      } else if (Math.round(weather.list[i].main.temp) === 0) {
        temp = 0;
      } else {
        temp = Math.round(weather.list[i].main.temp);
      }
      let feels_like;
      if (Math.round(weather.list[i].main.feels_like) > 0) {
        feels_like = '+' + Math.round(weather.list[i].main.feels_like);
      } else if (Math.round(weather.list[i].main.feels_like) === 0) {
        feels_like = 0;
      } else {
        feels_like = Math.round(weather.list[i].main.feels_like);
      }

      // constructing message
      message +=
        `  ${hours}:${mins}` +
        `   ${temp} \xB0C,` +
        ` feels like ${feels_like} \xB0C,  ` +
        `${weather.list[i].weather[0].description} \n`;

      prevDay = day;
      prevMonth = month;
      prevDate = date;
    }
  });

  return message;
}

module.exports = { getHoursInterval };
