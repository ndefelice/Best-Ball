//  To get all users, simply call:
// GET http://localhost:3000/users

// To filter by leagueId, call:
// GET http://localhost:3000/users?leagueId=YOUR_LEAGUE_ID

// To filter by userId, call:
// GET http://localhost:3000/users?userId=YOUR_USER_ID

// To filter by both leagueId and userId, call:
// GET http://localhost:3000/users?leagueId=YOUR_LEAGUE_ID&userId=YOUR_USER_ID

const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

// MongoDB connection string
const db = "mongodb+srv://ndefelice28:rXQC1yBVNLPfTKEE@bestball.isljx.mongodb.net/bestball?retryWrites=true&w=majority&appName=bestball";

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

router.get('/', async (req, res) => {
    try {
        const database = mongoose.connection.db;
        console.log(`Using database: ${database.databaseName}`);
        const collection = database.collection('user');
        console.log(`Using collection: ${collection.collectionName}`);

        const { leagueId, userId } = req.query; // Get query parameters

        // Create a filter object based on the query parameters
        const filter = {};
        if (leagueId) {
            filter.leagueId = leagueId; // Add leagueId filter if provided
        }
        if (userId) {
            filter.userId = userId; // Add userId filter if provided
        }

        // Fetch users based on the filter
        const users = await collection.find(filter).toArray(); // Call find and convert cursor to array
        // Send the users in the response
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error); // Log the error
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;
