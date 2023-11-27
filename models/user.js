const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	discordId: { type: String, required: true, unique: true },
	wallet: { type: Number, default: 0 },
	bank: { type: Number, default: 0 },
	totalDeposited: { type: Number, default: 0 },
	totalWithdrawn: { type: Number, default: 0 },
	bankSpace: { type: Number, default: 1000 },
});

module.exports = mongoose.model('User', UserSchema);
