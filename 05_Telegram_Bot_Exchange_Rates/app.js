// telegram bot
const TelegramBot = require('node-telegram-bot-api');
const token = '6198202858:AAERjUx5m9zVMSPY9FQTO5I_ABBRFle4sBE';
const bot = new TelegramBot(token, { polling: true });
// currency rate
const currencyRate = require('./currencyRate');

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const username = msg.chat.username;
  bot.sendMessage(chatId, `Вітаю ${username}`, {
    reply_markup: {
      keyboard: [['Курс валют']],
    },
  });
});

bot.onText(/Курс валют/, (msg) => {
  const chatId = msg.chat.id;
  const username = msg.chat.username;
  bot.sendMessage(
    chatId,
    'Оберіть валюту, для якої бажаєте отримати обмінний курс.',
    {
      reply_markup: {
        keyboard: [['USD', 'EUR'], ['Попереднє меню']],
      },
    }
  );
});

bot.onText(/Попереднє меню/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Повертаємось до попереднього меню', {
    reply_markup: {
      keyboard: [['Курс валют']],
    },
  });
});

bot.onText(/USD/, async (msg) => {
  const chatId = msg.chat.id;
  const messagePrivat = await currencyRate.getPrivatCurrencyRate('USD');
  bot.sendMessage(chatId, messagePrivat);
  const messageMono = await currencyRate.getMonobankCurrencyRate('USD');
  bot.sendMessage(chatId, messageMono);
});

bot.onText(/EUR/, async (msg) => {
  const chatId = msg.chat.id;
  const messagePrivat = await currencyRate.getPrivatCurrencyRate('EUR');
  bot.sendMessage(chatId, messagePrivat);
  const messageMono = await currencyRate.getMonobankCurrencyRate('EUR');
  bot.sendMessage(chatId, messageMono);
});

bot.on('message', (msg) => {
  const notCommandMessage =
    msg.text !== '/start' &&
    msg.text !== 'USD' &&
    msg.text !== 'EUR' &&
    msg.text !== 'Курс валют' &&
    msg.text !== 'Попереднє меню';

  if (notCommandMessage) {
    const chatId = msg.chat.id;
    const username = msg.chat.username;
    bot.sendMessage(
      chatId,
      `Вибач ${username}, я не вмію просто розмовляти. Обери необхідну опцію із меню.`,
      {
        reply_markup: {
          keyboard: [['Курс валют']],
        },
      }
    );
  }
});

// for easy debug
bot.on('polling_error', console.log);
