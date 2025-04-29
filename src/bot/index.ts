import { Telegraf, session, Context } from "telegraf";
import dotenv from "dotenv";

// Define your own context type
interface MyContext extends Context {
  myProp?: string
  myOtherProp?: number
}

const bot = new Telegraf<MyContext>(process.env.TELEGRAM_BOT_API!);
bot.use(session());
