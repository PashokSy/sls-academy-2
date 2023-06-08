// axios
const axios = require('axios');
// node cache
const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 120, checkperiod: 240 });

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
  let success;
  await axios({
    method: 'get',
    url: 'https://api.monobank.ua/bank/currency',
  })
    .then((apiResponse) => {
      const data = apiResponse.data;
      for (i in data) {
        // construct cache for further use
        if (data[i].currencyCodeA === 840 && data[i].currencyCodeB === 980) {
          success = myCache.set('USD', data[i]);
        }
        if (data[i].currencyCodeA === 978 && data[i].currencyCodeB === 980) {
          success = myCache.set('EUR', data[i]);
        }
        // simple answer
        if (data[i].currencyCodeA === codeA && data[i].currencyCodeB === 980) {
          response =
            `Обмінний курс в Монобанк (${currency}): \n` +
            ` Купівля: ${data[i].rateBuy} (UAH)\n` +
            ` Продаж: ${data[i].rateSell} (UAH)\n`;
        }
      }
    })
    .catch((error) => {
      if (currency === 'USD') {
        const data = myCache.get('USD');
        if (data === undefined) {
          response =
            `Обмінний курс в Монобанк (${currency}): \n` +
            ` Неможливо отримати дані\n`;
        } else {
          response =
            `Обмінний курс в Монобанк (${currency}): \n` +
            ` Купівля: ${data.rateBuy} (UAH)\n` +
            ` Продаж: ${data.rateSell} (UAH)\n`;
        }
      } else if (currency === 'EUR') {
        const data = myCache.get('EUR');
        if (data === undefined) {
          response =
            `Обмінний курс в Монобанк (${currency}): \n` +
            ` Неможливо отримати дані\n`;
        } else {
          response =
            `Обмінний курс в Монобанк (${currency}): \n` +
            ` Купівля: ${data.rateBuy} (UAH)\n` +
            ` Продаж: ${data.rateSell} (UAH)\n`;
        }
      } else {
        console.log(error);
        response = `Обмінний курс в Монобанк (${currency}):\n Невідома помилка\n`;
      }
    });

  return response;
}

module.exports = { getPrivatCurrencyRate, getMonobankCurrencyRate };
