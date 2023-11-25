const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	cooldown: 3,
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setColor('#000001')
			.setTitle(`🙋‍♂️ ${interaction.user.username}`)
			.setThumbnail(interaction.user.avatarURL())
			.setDescription(
				`Joined on ${interaction.member.joinedAt}.`,
			);
		await interaction.reply({ embeds: [embed] });
	},
};