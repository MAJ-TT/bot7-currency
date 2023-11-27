const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../../models/user');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('Check your balance.'),
	async execute(interaction) {
		try {
			await interaction.deferReply();

			const user = await User.findOne({ discordId: interaction.user.id });
			if (!user) {
				return interaction.editReply('You do not have an account yet. Please create one.');
			}

			const embed = new EmbedBuilder()
				.setTitle(`${interaction.user.username}'s Balance`)
				.addField('Wallet', user.wallet, true)
				.addField('Bank', `${user.bank}/${user.bankSpace}`, true)
				.addField('Total Deposited', user.totalDeposited, true)
				.addField('Total Withdrawn', user.totalWithdrawn, true)
				.setColor('BLUE');

			await interaction.editReply({ embeds: [embed] });
		}
		catch (error) {
			console.error('Error executing balance:', error);
			await interaction.editReply('There was an error trying to fetch your balance. Please try again later.');
		}
	},
};
