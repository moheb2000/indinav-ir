const express = require('express');

const { models } = require('../models/db');
const authenticate = require('../middlewares/authenticate');

const settings = express.Router();

settings.get('/', (req, res) => {
  models.settings.findOne({
    where: {
      id: 1,
    },
  }).then(settings => {
    return res.json(settings);
  }).catch(err => {
    console.log(`[ERROR]: ${err.message}`);

    return res.status(503).json({ error: 'Service unavailable!' });
  });
});

settings.patch('/', authenticate, (req, res) => {
  const { id, ...body } = req.body;

  models.settings.update(body, {
    where: { id: 1 },
  }).then(() => {
    return res.status(201).send();
  }).catch(err => {
    return res.status(400).json({ error: err.message });
  });
});

module.exports = settings;
