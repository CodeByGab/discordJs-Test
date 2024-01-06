import { SlashCommandBuilder } from "@discordjs/builders";

const nickCommand = new SlashCommandBuilder()
    .setName('newnickuser')
    .setDescription('Change your nickname')
    .addStringOption((option) =>
        option
        .setName('nickname')
        .setDescription('Your new nick')
        .setRequired(true)
    )
    .addUserOption((option) => 
        option
        .setName('user')
        .setDescription('The user to change the nick')
        .setRequired(true)
    )

export default nickCommand.toJSON();