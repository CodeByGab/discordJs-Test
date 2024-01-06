import { SlashCommandBuilder } from '@discordjs/builders';

const orderCommand = new SlashCommandBuilder()
    .setName('order')
    .setDescription('Order your favorite meal!')
    .addStringOption((option) => 
        option
        .setName('food')
        .setDescription('Select your favorite food')
        .setRequired(true)
        .setChoices(
            {
            name: 'Cake',
            value: 'Cake',
            }, {
            name: 'Chocolate',
            value: 'Chocolate',
            }, {
            name: 'Hamburguer',
            value: 'Hamburguer',
            },
        )
    )
    .addStringOption((option) =>
        option
        .setName('drink')
        .setDescription('Select your favorite drink')
        .setRequired(true)
        .setChoices(
            {
            name: 'Guaraná antártica',
            value: 'guaraná',
            },
            {
            name: 'Coca cola',
            value: 'coca-cola',
            },
            {
            name: 'Sprite',
            value: 'sprite',
            },
        )
    )

export default orderCommand.toJSON();