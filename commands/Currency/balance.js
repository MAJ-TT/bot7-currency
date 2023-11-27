const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('Get your current balance.'),
	async execute(interaction) {
		const user = interaction.user.id;
		const userData = await interaction.client.currency.findOne({ userId: user });
		if (!userData) {
			return interaction.reply('You have no currency yet!');
		}
		return interaction.reply(`Your current balance is ${userData.balance}`);
	},
};
