import { config } from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";

config();

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
] });
const TOKEN = process.env.BOT_TOKEN;

client.login(TOKEN);

client.on("ready", () => {
  console.log(`${client.user.displayName} has logged in`);
});

client.on("messageCreate", (message) => {
  console.log(message.content);
  console.log(message.author.username);
});
