import { SlashCommandBuilder } from "@discordjs/builders";

const testSheet = new SlashCommandBuilder()
    .setName('testsheet')
    .setDescription('test')

export default testSheet.toJSON();