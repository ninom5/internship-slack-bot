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
    const userMessage = message.text.trim().toLowerCase();

    if(userMessage === "hi" || userMessage === "hello") {
      await say({ text: `Hello  <@${message.user}>! :wave:` });
      return;
    }

    const response = await sheetsApi(message.text);

    if(response.length === 0) {
      await say({ text: "No data found" });
      return;
    }

    const formattedResponse = response
    .map(({ item, locations }) => `Last known locations of *${item}*: ${locations.map(loc => `*${loc}*`).join(", ")}.`)
    .join("\n");

    await say({ text: formattedResponse });
  } 
  catch (error) {
    console.log(error);
    await say({ text: "An error occurred: ", error });
  }
});

(async () => {
  await app.start();

  app.logger.info("⚡️ Bolt app is running!");
})();
