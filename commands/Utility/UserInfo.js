const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	cooldown: 3,
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
		const member = interaction.guild.members.cache.get(interaction.user.id);
		const roles = member.roles.cache.map(role => role.name).join(', ');
		const joinedDiscordDate = interaction.user.createdAt.toDateString();
		const joinedServerDate = member.joinedAt.toDateString();

		const embed = new EmbedBuilder()
			.setColor('#000001')
			.setTitle(`🙋‍♂️ ${interaction.user.username}`)
			.setThumbnail(interaction.user.avatarURL())
			.addFields(
				{ name: '🫂 User Joined Discord On:', value: joinedDiscordDate },
				{ name: '🫂 User Joined Server On:', value: joinedServerDate },
				{ name: '🫂 User Roles:', value: roles },
			);

		await interaction.reply({ embeds: [embed] });
	},
};
