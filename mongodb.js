const { MongoClient } = require('mongodb');

async function checkDatabaseStatus() {
	const uri = 'mongodb+srv://majtt:9KpP4tgnSm4WPz@cluster0.3ykphqg.mongodb.net/?retryWrites=true&w=majority';
	const client = new MongoClient(uri);

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
