const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// New route to fetch standings data
const standingsRoute = require('./routes/standings');
app.use('/api/standings', standingsRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect('mongodb+srv://ndefelice:iKsNIo8Z6xv5gzez@bestball.jduq6.mongodb.net/?retryWrites=true&w=majority&appName=BestBall')
.then(() => {
  console.log('Connected to MongoDB');
}).catch(() => {
  console.log('Connection failed');
});
