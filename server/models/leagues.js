const mongoose = require('mongoose');

const leaguesSchema = new mongoose.Schema({
    league_id: Number,
});

const Leagues = mongoose.model('Leagues', leaguesSchema);

module.exports = Leagues;