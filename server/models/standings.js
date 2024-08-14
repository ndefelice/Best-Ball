const mongoose = require('mongoose');

const standingsSchema = new mongoose.Schema({
    display_name: String,
    fpts: Number,
    rank: Number,
    owner_id: String,
});

const Standings = mongoose.model('Standings', standingsSchema);

module.exports = Standings;