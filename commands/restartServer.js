const { SlashCommandBuilder } = require('discord.js');
const { write } = require("../command_writer.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server_restart')
        .setDescription('малый рестарт'),
    async execute(interaction) {
        await interaction.deferReply();
        await write("command.restart", [""]);
        await interaction.editReply(`### Запрос отправлен`);
    },
};
