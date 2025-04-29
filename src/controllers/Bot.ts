import { Context, Telegraf, session } from "telegraf";
import { message } from 'telegraf/filters';
import dotenv from 'dotenv';
import User from "../models/User";
import { checkUser, updateAge, updateLocation, updateStage } from "../utils/UsersFunctions";

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

bot.start((ctx: any) => {
  ctx.session ??= { messageCount: 0 };
  ctx.session.messageCount = 0;
  ctx.session.messageCount++;

  const chatId = ctx.chat.id;
  const username = ctx.chat.username!;

  checkUser(chatId, username);
  updateStage(chatId, ctx.session!.messageCount);

  ctx.reply('Welcome to Sheger Talk Bot');

  bot.telegram.sendMessage(ctx.chat.id, 'Choose Your Language 👇', {
    reply_markup: {
      keyboard: [
        [
          { text: "🇺🇸 English" },
          // { text: "🇪🇹 አማርኛ" },
        ],
      ],
      resize_keyboard: true,
    }
  });

});

bot.hears('🇺🇸 English', (ctx) => {
  const chatId = ctx.chat.id;
  ctx.session!.messageCount++;

  updateStage(chatId, ctx.session!.messageCount);
  console.log('Session Stage: ' + ctx.session!.messageCount);

  const letsStartString = 'Start Sheger Talk and talk to Habeshas form all over 🇪🇹 Ethiopia \n\n' +
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
  const chatId = ctx.chat.id;
  ctx.session!.messageCount++;

  updateStage(chatId, ctx.session!.messageCount);

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
  const chatId = ctx.chat.id;

  updateStage(chatId, ctx.session!.messageCount);
  console.log('Session Stage: ' + ctx.session!.messageCount);

  const ageString = 'Your age?';
  bot.telegram.sendMessage(ctx.chat.id, ageString, {});
  if (ctx.session!.messageCount == 4) {
    bot.on('text', (ctx) => {
      var Sage = parseInt(ctx.message.text);
      const age = !isNaN(Sage);
      if (age == false) {
        ctx.reply('Please Enter a Number');
      } else {
        console.log('Age is ' + ctx.message.text);
        updateAge(chatId, parseInt(ctx.message.text));



        const confirmGender = 'Your Gender? ';
        ctx.session!.messageCount++;
        updateStage(chatId, ctx.session!.messageCount);
        bot.telegram.sendMessage(ctx.chat.id, confirmGender, {

          reply_markup: {
            keyboard: [
              [
                { text: '👨 Male' },
                { text: '👧 Female' }
              ]
            ],
            resize_keyboard: true,
          }
        });

      }
    });
  }

});

const requestPhoneKeyboard = {
  reply_markup: {
    // one_time_keyboard: true,
    resize_keyboard: true,
    keyboard: [
      [
        {
          text: "Share my number",
          request_contact: true,
          // request_location: true,
          one_time_keyboard: true,
        },
      ],
      [
        { text: "Back", callback_data: "back" },
        { text: "Cancel", callback_data: "cancel_subscription" },
      ],
    ],
  },
}

const requestLocationKeyboard = {
  reply_markup: {
    // one_time_keyboard: true,
    resize_keyboard: true,
    keyboard: [
      [
        {
          text: "Share my location",
          request_location: true,
          one_time_keyboard: true,
        },
      ],
      [
        { text: "Back", callback_data: "back" },
        { text: "Cancel", callback_data: "cancel_subscription" },
      ],
    ],
  },
}

bot.hears('👨 Male', (ctx) => {

  bot.telegram.sendMessage(ctx.chat.id, 'Share Your Location', requestLocationKeyboard);


  bot.on('location', async (ctx) => {
    ctx.session!.messageCount++;
    const chatId = ctx.chat.id;

    const location = ctx.update.message.location;
    updateLocation(chatId, location.latitude, location.longitude);

    const nameConfirmation = 'Your Name?';

    updateStage(chatId, ctx.session!.messageCount);

    bot.telegram.sendMessage(ctx.chat.id, nameConfirmation);





  });




  // bot.on('contact', async (ctx) => {
  //   const phoneNumber = ctx.update.message.contact.phone_number;
  //   console.log(ctx.update.message.contact);
  //   console.log(`Received phone number: ${phoneNumber}`);
  //   await ctx.reply(`Thank you for sharing your phone number: ${phoneNumber}`);
  // });


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


