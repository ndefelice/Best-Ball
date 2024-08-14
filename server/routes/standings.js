const express = require('express');
const router = express.Router();
const Standings = require('../models/standings');

// New route to fetch standings data
router.get('/', async (req, res) => {
    try {
      const standings = await Standings.find();
      res.json(standings);
    } catch (error) {
      res.status(500).send('Error fetching standings');
    }
  });

  module.exports = router;