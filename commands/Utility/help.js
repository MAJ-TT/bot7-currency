const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Shows help menu.'),

	async execute(interaction) {
		try {
			const commandsPath = path.join(__dirname, '..', 'Utility');
			const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

			const commandList = [];
			for (const file of commandFiles) {
				const command = require(path.join(commandsPath, file));
				const commandData = command.data;

				const description = commandData.description && commandData.description.trim() !== '' ? commandData.description : 'No description available';

				const capitalizedDescription = description.charAt(0).toUpperCase() + description.slice(1);

				// Format description in Discord block quotes
				const formattedDescription = `> ${capitalizedDescription.replace(/\n/g, '\n> ')}`;

				commandList.push(`**/${commandData.name}**:\n${formattedDescription}`);
			}

			const embed = new EmbedBuilder()
				.setColor('#000001')
				.setTitle('Help Menu')
				.setDescription(commandList.join('\n\n'));

			await interaction.reply({ embeds: [embed], ephemeral: false });
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while fetching commands.', ephemeral: false });
		}
	},
};
