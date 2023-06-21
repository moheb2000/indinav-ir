const express = require('express');

const { models } = require('../models/db');

const pages = express.Router();

pages.get('/', (_req, res) => {
  models.page.findAndCountAll({
    order: [
      ['title', 'DESC'],
    ],
    attributes: {exclude: ['autherId', 'body']},
  }).then(pages => {
    res.json(pages);
  }).catch(err => {
    console.log(`[ERROR]: ${err.message}`);

    res.status(503).json({ error: 'Service unavailable!' });
  });
});

pages.post('/', (req, res) => {
  const { id, ...body } = req.body;

  models.page.create(body).then(() => {
    res.status(201).send();
  }).catch(err => {
    res.status(400).json({ error: err.message });
  });
});

pages.get('/:id', (req, res) => {
  models.page.findByPk(req.params.id, {
    attributes: {exclude: ['autherId']},
    include: [
      {
        model: models.auther,
        attributes: ['id', 'displayName'],
      },
    ],
  }).then(page => {
    res.json(page);
  }).catch(err => {
    console.log(`[ERROR]: ${err.message}`);

    res.status(503).json({ error: 'Service unavailable!' });
  });
});

pages.patch('/:id', (req, res) => {
  const { id, autherId, ...body } = req.body;

  models.page.update(body, {
    where: { id: req.params.id },
  }).then(() => {
    res.status(201).send();
  }).catch(err => {
    res.status(400).json({ error: err.message });
  });
});

pages.delete('/:id', (req, res) => {
  models.page.destroy({
    where: {
      id: req.params.id,
    }
  }).then(() => {
    res.status(204).send();
  }).catch(err => {
    console.log(`[ERROR]: ${err.message}`);

    res.status(503).json({ error: 'Service unavailable!' });
  });
});

module.exports = pages;
