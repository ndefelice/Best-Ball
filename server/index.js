const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ObjectId } = require('mongodb');

const Player = require('./schemas/player');
const User = require('./schemas/user')

const app = express();
const port = 3000;

const db = "mongodb+srv://ndefelice28:rXQC1yBVNLPfTKEE@bestball.isljx.mongodb.net/bestball?retryWrites=true&w=majority&appName=bestball";
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

const database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', function() {
  console.log('Connected to the database');
});

app.use(express.json()); // Middleware
app.use(cors()); // Middleware


app.get('/', (req, res) => {
    res.json({message: 'Hello World!'});
});

const players = require('./routes/players');
app.use('/players', players);

const users = require('./routes/users');
app.use('/users', users);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});