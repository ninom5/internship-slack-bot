import pkg from "@slack/bolt";
import { sheetsApi } from "./sheetsApi.js";
import dotenv from "dotenv";

dotenv.config();

const { App } = pkg;

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT,
});

app.message(async ({ message, say }) => {
  try {
    const response = await sheetsApi(message.text);

    console.log(response);

    await say({ text: response });
  } 
  catch (error) {
    console.log(error);
  }
});

(async () => {
  await app.start();

  app.logger.info("⚡️ Bolt app is running!");
})();
