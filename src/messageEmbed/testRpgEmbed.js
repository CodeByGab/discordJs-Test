import { EmbedBuilder } from "@discordjs/builders";

function testRpgEmbed(charName, img, color, level, skills, attributes){
    const testRpgEmbed = new EmbedBuilder()
        .setTitle(charName)
	    .setThumbnail(img)
        .setColor(color)
        .addFields({ name: 'NEX', value: `${level}% / Max PE ${level / 5}`})
        .addFields({ name: 'Skills', value: formatSkills(skills)})
        .addFields({ name: 'Attributes', value: formatAttributes(attributes)})

    return testRpgEmbed
}

function formatSkills(skills){
    return Object.entries(skills).map(([skill, value]) => `${skill}: ${value}`).join('\n');
}

function formatAttributes(attributes){
    return Object.entries(attributes).map(([attributes, value]) => `${attributes}: +${value}`).join('\n');
}

export default testRpgEmbed