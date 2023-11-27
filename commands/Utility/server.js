const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setColor('#000001')
			.setTitle(`🏯 ${interaction.guild.name}`)
			.setThumbnail(interaction.guild.iconURL())
			.setDescription(
				`This server has ${interaction.guild.memberCount} members.`,
			);

		await interaction.reply({ embeds: [embed] });
	},
};
