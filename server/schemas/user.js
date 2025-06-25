const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    displayName: { type: String, required: true },
    ovrRank: { type: Number, default: null },
    leagueRank: { type: Number, default: null },
    userAvatar: { type: String, default: null },
    leagueId: { type: String, default: null },
    userId: { type: String, default: null },
    roster: { type: [String], default: [] },
    totalPoints: { type: Number, default: 0 },
});

const User = mongoose.model('User', userSchema, 'user');

module.exports = User;