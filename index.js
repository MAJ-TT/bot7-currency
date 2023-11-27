const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token, mongo_URI } = require('./config.json');
const mongoose = require('mongoose');
const deployCommands = require('./deploy-commands.js');

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds] });

discordClient.cooldowns = new Collection();
discordClient.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			discordClient.commands.set(command.data.name, command);
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		discordClient.once(event.name, (...args) => event.execute(...args));
	}
	else {
		discordClient.on(event.name, (...args) => event.execute(...args));
	}
}


mongoose.connect(mongo_URI)
	.then(() => {
		console.log('Connected to MongoDB via Mongoose');

		deployCommands();
		return discordClient.login(token);
	})
	.then(() => {
		console.log('Okay, Yeah its working.');
	})
	.catch(err => {
		console.error('Error:', err);
	});
