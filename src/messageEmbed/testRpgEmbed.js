import { EmbedBuilder } from "@discordjs/builders";

function testRpgEmbed(characterSheet){
    const testRpgEmbed = new EmbedBuilder()
        .setTitle(characterSheet.name)
	    .setThumbnail(characterSheet.img)
        .setColor(characterSheet.color)
        .addFields(
            { name: `NEX ${characterSheet.level}%:`, value: `Max PE ${characterSheet.level / 5}`},
            // { name: 'Skills:', value: formatSkills(characterSheet.skills)},
            { name: 'Attributes:', value: formatAttributes(characterSheet.attributes)},
        )
        .setImage(characterSheet.skills)

    return testRpgEmbed
}

function formatSkills(skills){
    return Object.entries(skills).map(([skill, value]) => `${skill}: ${value}`).join('\n');
}

function formatAttributes(attributes){
    return Object.entries(attributes).map(([attributes, value]) => `${attributes}: +${value}`).join('\n');
}

export default testRpgEmbed