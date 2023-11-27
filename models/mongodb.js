const { MongoClient } = require('mongodb');
const { mongo_URI } = require('./config.json');

async function checkDatabaseStatus() {
	const client = new MongoClient(mongo_URI);

	try {
		// Connect to the MongoDB cluster
		await client.connect();

		// Specify the database you want to access
		const db = client.db('currency');

		// Check the status of the database
		const status = await db.command({ serverStatus: 1 });
		console.log(status);
	}
	catch (error) {
		console.error('Error:', error);
	}
	finally {
		// Close the connection to the MongoDB cluster
		await client.close();
	}
}

checkDatabaseStatus();
