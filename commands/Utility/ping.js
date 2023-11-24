const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 3,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with the latency'),
	async execute(interaction) {
		await interaction.reply(`Pong! \nLatency is ${Date.now() - interaction.createdTimestamp}ms.`);
	},
};