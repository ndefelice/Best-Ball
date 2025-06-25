const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    playerId: { type: String, default: null },
    playerName: { type: String, default: null },
    team: { type: String, default: null },
    position: { type: String, default: null },
    status: { type: String, default: null }
});

const Player = mongoose.model('Player', playerSchema, 'player');

module.exports = Player;