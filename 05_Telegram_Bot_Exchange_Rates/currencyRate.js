// axios
const axios = require('axios');

async function getPrivatCurrencyRate(currency) {
  // currency 'EUR' or 'USD' to get answers for different currencies
  let response;
  await axios({
    method: 'get',
    url: 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',
  }).then((apiResponse) => {
    const data = apiResponse.data;
    for (i in data) {
      if (data[i].ccy === currency) {
        response =
          `Обмінний курс в Приват (${currency}): \n` +
          ` Купівля: ${data[i].buy.slice(0, -3)} (UAH)\n` +
          ` Продаж: ${data[i].sale.slice(0, -3)} (UAH)\n`;
      }
    }
  });

  return response;
}

module.exports = { getPrivatCurrencyRate };
