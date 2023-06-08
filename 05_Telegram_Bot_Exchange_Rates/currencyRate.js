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
          ` Купівля: ${data[i].buy} (UAH)\n` +
          ` Продаж: ${data[i].sale} (UAH)\n`;
      }
    }
  });

  return response;
}

async function getMonobankCurrencyRate(currency) {
  // currency 'EUR' or 'USD' to get answers for different currencies
  // Monobank use ISO 4217 codes: USD - 840; EUR - 978; UAH - 980
  const codeA = currency === 'USD' ? 840 : 978;
  let response;
  await axios({
    method: 'get',
    url: 'https://api.monobank.ua/bank/currency',
  }).then((apiResponse) => {
    const data = apiResponse.data;
    for (i in data) {
      if (data[i].currencyCodeA === codeA && data[i].currencyCodeB === 980) {
        response =
          `Обмінний курс в Монобанк (${currency}): \n` +
          ` Купівля: ${data[i].rateBuy} (UAH)\n` +
          ` Продаж: ${data[i].rateSell} (UAH)\n`;
      }
    }
  });

  return response;
}

module.exports = { getPrivatCurrencyRate, getMonobankCurrencyRate };
