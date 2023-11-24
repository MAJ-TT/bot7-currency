// help.js
const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Show help menu'),

	async execute(interaction) {
		try {
			const commandsPath = path.join(__dirname, '..', 'Utility');
			const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

			const commandList = commandFiles.map(file => {
				const command = require(path.join(commandsPath, file));
				return `/${command.data.name}: ${command.data.description}`;
			});

			await interaction.reply({ content: `Available commands:\n${commandList.join('\n')}`, ephemeral: true });
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while fetching commands.', ephemeral: true });
		}
	},
};
