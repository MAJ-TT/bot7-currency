const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	cooldown: 3,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with the latency of bot.'),
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setColor('#000001')
			.setTitle('🏓  Pong!')
			.setThumbnail('https://i.gifer.com/3I7p.gif')
			.setDescription(
				`Latency is ${Date.now() - interaction.createdTimestamp}ms`,
			);

		await interaction.reply({ embeds: [embed] });
	},
};
