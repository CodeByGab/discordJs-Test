import { SlashCommandBuilder } from "@discordjs/builders";

const proprioNick = new SlashCommandBuilder()
    .setName('proprionick')
    .setDescription('colocar outro nick')
    .addStringOption((option) => 
        option
        .setName('nick')
        .setDescription('novo nick')
        .setRequired(true)
    )

export default proprioNick.toJSON()