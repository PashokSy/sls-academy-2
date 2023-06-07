// telegram bot
const TelegramBot = require('node-telegram-bot-api');
const token = '6198202858:AAERjUx5m9zVMSPY9FQTO5I_ABBRFle4sBE';
const bot = new TelegramBot(token, { polling: true });

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
        keyboard: [['USD'], ['EUR']],
      },
    }
  );
});

bot.onText(/USD/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Обмінний курс для USD');
});

bot.onText(/EUR/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Обмінний курс для EUR');
});

bot.on('message', (msg) => {
  const notCommandMessage =
    msg.text !== '/start' &&
    msg.text !== 'USD' &&
    msg.text !== 'EUR' &&
    msg.text !== 'Курс валют';

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
