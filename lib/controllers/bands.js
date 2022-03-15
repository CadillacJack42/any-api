const { Router } = require('express');
const Band = require('../models/Band');
// const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    const band = await Band.insert({
      name: req.body.name,
      members: req.body.members,
      inception: req.body.inception,
    });

    res.json(band);
  })

  .get('/', async (req, res) => {
    const band = 'Zeppelin';
    res.send(band);
  });
