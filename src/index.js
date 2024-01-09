import { config } from 'dotenv';
import { Client, GatewayIntentBits, InteractionCollector, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';
import orderCommand from './slashCommands/orderCommand.js';
import rolesCommand from './slashCommands/rolesCommand.js';
import nickCommand from './slashCommands/nickCommand.js';
import proprioNickCommand from './slashCommands/proprioNickCommand.js';
import proprioNickEmbed from './messageEmbed/proprioNickEmbed.js';
import testRpgCommand from './slashCommands/testRpgCommand.js';
import testRpgEmbed from './messageEmbed/testRpgEmbed.js';

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

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand) return;

  if(interaction.commandName === 'order') {
    const food = interaction.options.get('food').value;
    const drink = interaction.options.get('drink').value;
    await interaction.reply({content:`${food} and ${drink} was ordered`});
  }

  if(interaction.commandName === 'newnickuser') {

    const newNick = interaction.options.getString('nickname');
    const user = interaction.options.getUser('user');
    const memberToChangeNick = interaction.guild.members.cache.get(user.id)
    memberToChangeNick.setNickname(newNick, 'none')
      .then( async () => {
        await interaction.reply('it worked')
      })
      .catch( async (err) => {
        await interaction.reply(err)
      })
  }

  // doing this in portuguese to a friend understand
  if(interaction.commandName === 'proprionick') {
    const novoNick = interaction.options.getString('nick');
    const nomeId = interaction.user.id;
    const nome = interaction.guild.members.cache.get(nomeId);
    const embedFuncionando = proprioNickEmbed(0x00FF00, 'novo', 'antigo');
    const embedErro = proprioNickEmbed(0xFF0000, 'novo', 'antigo');
    nome.setNickname(novoNick, 'nenhum')
      .then( async () => {
        await interaction.reply({
          embeds: [
            embedFuncionando
          ],
          ephemeral: true
        })
      })
      .catch(async (err) => {
        console.log(err)
        await interaction.reply({
          embeds: [
            embedErro
          ],   
          ephemeral: true
        })
      })
  }

  if(interaction.commandName === "testsheet") {

    const characterSheet = {
      name: 'Character Name',
      img: 'https://imgur.com/7STkan9.png',
      color: 0xFF0000,
      attributes: {
        Acrobacia: 5, 
        Atletismo: 5, 
        Iniciativa: 10
      },
      level: 25,
      hp: {
        atual: 70,
        max: 100,
      },
      mana: {
        atual: 70,
        max: 100,
      },
      sanity: {
        atual: 70,
        max: 100,
      },
      skills: 'https://imgur.com/L7fKBgS.png'
    }

    const charName = characterSheet.name;
    // link to a friend's drawing
    const tokenImg = characterSheet.img;
    const color = characterSheet.color;
    const skills = characterSheet.skills;
    const attributes = characterSheet.attributes;
    const level = characterSheet.level;
    
    const sheetEmbed = testRpgEmbed(characterSheet);
    interaction.reply({
      embeds: [
        sheetEmbed
      ]
    })
  }

});

async function main(){

  const commands = [
    orderCommand, 
    rolesCommand, 
    nickCommand,
    proprioNickCommand,
    testRpgCommand
  ];

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
