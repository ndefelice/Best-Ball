const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Player = require('../../schemas/player'); // Import the Players model
import { fetchPlayers } from '../sleeper';

// MongoDB connection string
const db = "mongodb+srv://ndefelice28:rXQC1yBVNLPfTKEE@bestball.isljx.mongodb.net/bestball?retryWrites=true&w=majority&appName=bestball";

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

const database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', function() {
  console.log('Connected to the database');
  
  fetchPlayers(); // Gt the players from the Sleeper API, and store in JSON

  // Read and parse the JSON file
  const filePath = path.join('../', 'players.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    const players = JSON.parse(data);
    const playerEntries = Object.values(players).map(player => ({
      playerId: player.player_id,
      playerName: player.full_name,
      team: player.team,
      position: player.position,
      status: player.status
    }));

    // Insert each player into the players collection
    Player.collection.insertMany(playerEntries)
      .then(() => {
        console.log('Players inserted successfully');
        mongoose.connection.close();
      })
      .catch((error) => {
        console.error('Error inserting players:', error);
        mongoose.connection.close();
      });
  });
});