const { Events } = require('discord.js');
const { ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

		client.user.setActivity('activity', { type: ActivityType.Watching });
		client.user.setActivity('activity', { type: ActivityType.Listening });
		client.user.setActivity('activity', { type: ActivityType.Competing });
		client.user.setPresence({ activities: [{ name: 'with MAJ in VS Code' }], status: 'idle' });
	},
};
