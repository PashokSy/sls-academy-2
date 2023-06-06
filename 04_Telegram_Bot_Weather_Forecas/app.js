// telegram bot
const TelegramBot = require('node-telegram-bot-api');
const token = '6198202858:AAERjUx5m9zVMSPY9FQTO5I_ABBRFle4sBE';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const username = msg.chat.username;
  bot.sendMessage(chatId, `Welcome ${username}`, {
    reply_markup: {
      keyboard: [['Forecast in Zhovti Vody']],
    },
  });
});

bot.onText(/Forecast in Zhovti Vody/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    'Chose intervals, at with you want to see weather forecast',
    {
      reply_markup: {
        keyboard: [['at intervals of 3 hours'], ['at intervals of 6 hours']],
      },
    }
  );
});

bot.onText(/at intervals of 3 hours/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'you chose 3 hours interval');
});

bot.onText(/at intervals of 6 hours/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'you chose 6 hours interval');
});

bot.on('message', (msg) => {
  const notCommandMessage =
    msg.text !== '/start' &&
    msg.text !== 'Forecast in Zhovti Vody' &&
    msg.text !== 'at intervals of 3 hours' &&
    msg.text !== 'at intervals of 6 hours';

  if (notCommandMessage) {
    const chatId = msg.chat.id;
    const username = msg.chat.username;
    bot.sendMessage(
      chatId,
      `Sorry ${username}, i can't speak to you. Chose some option from buttons menu`,
      {
        reply_markup: {
          keyboard: [['Forecast in Zhovti Vody']],
        },
      }
    );
  }
});

// for easy debug
bot.on('polling_error', console.log);
