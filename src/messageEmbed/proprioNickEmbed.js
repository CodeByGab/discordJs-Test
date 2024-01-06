import { EmbedBuilder } from "@discordjs/builders";

function proprioNickEmbed(color, newNick, oldNick,) {
    const proprioNickEmbed = new EmbedBuilder()
        .setColor(color)
        .setTitle('Nome do usuário')
        .addFields(
            { name: 'Nick novo', value: `${newNick}`, inline: true },
            { name: 'Nick antigo', value: `${oldNick}`, inline: true },
        )
    return proprioNickEmbed;
}

export default proprioNickEmbed;