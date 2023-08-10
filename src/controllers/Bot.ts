import { Context, Telegraf, session } from "telegraf";
import { message } from 'telegraf/filters';

import dotenv from 'dotenv';

interface SessionData {
  messageCount: number;
  // ... more session data go here
}

// Define your own context type
interface MyContext extends Context {
  session?: SessionData;
  // ... more props go here
}

dotenv.config();

// Define your own context type
interface MyContext extends Context {
  myProp?: string
  myOtherProp?: number
}

const bot = new Telegraf<MyContext>(process.env.TELEGRAM_BOT_API!);

var stage = 0;

bot.use(session());

bot.start((ctx) => {
  ctx.session ??= { messageCount: 0 };
  ctx.session.messageCount = 0;
  ctx.session.messageCount++;

  console.log('Session Stage: ' + ctx.session.messageCount);

  console.log(ctx.message);

  ctx.reply('Welcome to Sheger Talk Bot');


  console.log(ctx.chat.id);
  bot.telegram.sendMessage(ctx.chat.id, 'Choose Your Language 👇', {
    reply_markup: {
      keyboard: [
        [
          { text: "🇺🇸 English" },
          { text: "🇪🇹 አማርኛ" },
        ]
      ],
      resize_keyboard: true,
    }
  });


});

bot.hears('🇺🇸 English', (ctx) => {
  ctx.session!.messageCount++;
  console.log('Session Stage: ' + ctx.session!.messageCount);

  const letsStartString = 'Signup To Sheger Talk and talk to Habeshas form all over 🇪🇹 Ethiopia \n\n' +
    'Get Your Friends Now 👇 \n\n' +
    '🇪🇷 Eritrea will be added soon \n'

  bot.telegram.sendMessage(ctx.chat.id, letsStartString, {
    reply_markup: {
      keyboard: [
        [
          { text: 'Lets Start 👇' }
        ]
      ],
      resize_keyboard: true,
    }
  });

});

bot.hears('Lets Start 👇', (ctx) => {
  ctx.session!.messageCount++;
  console.log('Session Stage: ' + ctx.session!.messageCount);

  const confirmationString = '❗️ Remember that on the internet people can impersonate others \n\n\n The bot does not ask for personal data and does not identify users by any documents. \n\n Enjoy and Don\'t forget to have fun and share with your friends 👇 \n\n';

  bot.telegram.sendMessage(ctx.chat.id, confirmationString, {
    reply_markup: {
      keyboard: [
        [
          { text: 'Continue ✌️' },
        ]
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    }
  });



});


bot.hears('Continue ✌️', (ctx) => {
  ctx.session!.messageCount++;
  console.log('Session Stage: ' + ctx.session!.messageCount);

  const ageString = 'Your age?';
  bot.telegram.sendMessage(ctx.chat.id, ageString);

  console.log(ctx.message);


});




// bot.on("message", async (ctx) => {
//   // set a default value
//   ctx.session ??= { messageCount: 0 };
//   ctx.session.messageCount++;

//   if (ctx.session.messageCount == 1) {
//     console.log("This Is The Age");
//     console.log(ctx.message.text);
//     await ctx.reply(`Your Age is this now.`);
//   }

// });


// Launch the Bot
bot.launch();


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// Export the Bot
module.exports = bot;