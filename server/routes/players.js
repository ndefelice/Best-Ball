const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

// MongoDB connection string
const db = "mongodb+srv://ndefelice28:rXQC1yBVNLPfTKEE@bestball.isljx.mongodb.net/bestball?retryWrites=true&w=majority&appName=bestball";

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

router.get('/:id', async (req, res) => {
    const playerId = req.params.id;
    console.log(playerId);

    try {
        const database = mongoose.connection.db;
        console.log(`Using database: ${database.databaseName}`); // This should now print 'bestball'
        const collection = database.collection('player');
        console.log(`Using collection: ${collection.collectionName}`);
        const player = await collection.findOne({ playerId: playerId });

        if (player) {
            res.json(player);
        } else {
            res.status(404).json({ message: 'Player not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;