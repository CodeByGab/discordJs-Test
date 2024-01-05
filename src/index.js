import { config } from 'dotenv';
import { Client, GatewayIntentBits, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';
import orderCommand from './slashCommands/orderCommand.js';

config();

const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]});

const rest = new REST({ version: '10'}).setToken(TOKEN);

client.on('ready', () => console.log(`${client.user.displayName} has logged in`));
client.on('messageCreate', (message) => {
  const text = message.content.toLowerCase();
  console.log(text);
  if(text.includes('misericordia')) message.reply('Misericordinha (filho dele)');
  if(text.includes('teste')) message.reply('testado');
});

let data = '';

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand || interaction.isButton() ||interaction.isModalSubmit()) return;

  if(interaction.commandName === 'order') {
    const food = interaction.options.get('food').value;
    const drink = interaction.options.get('drink').value;
    await interaction.reply({content:`${food} and ${drink} was ordered`});
  }
});

async function main(){

  const commands = [orderCommand.toJSON()];

  try {
    const commandsLength = commands.length
    console.log(`Started refreshing ${commandsLength} applications (/) commands.`);

    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { 
      body: commands
    });
    client.login(TOKEN);
    console.log(`Successfully reloaded ${commandsLength} applications (/) commands.`);

  } catch(err) {
    console.error(err);
  }
}

main();
