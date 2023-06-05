// strange warning fix
process.env['NTBA_FIX_350'] = 1;

// telegram bot
const TelegramBot = require('node-telegram-bot-api');
const token = '6198202858:AAERjUx5m9zVMSPY9FQTO5I_ABBRFle4sBE';
const bot = new TelegramBot(token, { polling: true });

const chatId = '309745893';

// commander
const { program } = require('commander');

program.name('app').description('CLI Telegram Console Sender').version('0.0.1');

program
  .command('send-message')
  .alias('m')
  .description('Send a message to telegram bot')
  .argument('message', 'message to send')
  .action(async (message) => {
    await bot.sendMessage(chatId, message);
    process.exit(0);
  });

program
  .command('send-photo')
  .alias('p')
  .description(
    'Send a photo to telegram bot. Just drug and drop file in console after p-flag'
  )
  .argument('path', 'path to photo')
  .action(async (path) => {
    await bot.sendPhoto(chatId, path);
    process.exit(0);
  });

program.parse(process.argv);
