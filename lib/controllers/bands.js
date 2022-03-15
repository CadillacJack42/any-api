const { Router } = require('express');
const Band = require('../models/Band');

module.exports = Router()
  .post('/', async (req, res) => {
    const band = await Band.insert({
      name: req.body.name,
      members: req.body.members,
      inception: req.body.inception,
    });

    res.json(band);
  })

  .get('/bands', async (req, res) => {
    const band = await Band.getAllBands();
    console.log('CONTROLLER', band);
    res.send(band);
  })

  .get('/:id', async (req, res) => {
    const band = await Band.getById(req.params.id);
    res.send(band);
  });
