const express = require('express');

const { models } = require('../models/db');

const pages = express.Router();

pages.get('/', (_req, res) => {
  models.page.findAll({
    order: [
      ['title', 'DESC'],
    ],
    attributes: {exclude: ['autherId', 'body']},
  }).then(pages => {
    return res.json(pages);
  }).catch(err => {
    console.log(`[ERROR]: ${err.message}`);

    return res.status(503).json({ error: 'Service unavailable!' });
  });
});

pages.post('/', (req, res) => {
  const { id, ...body } = req.body;

  models.page.create(body).then(() => {
    return res.status(201).send();
  }).catch(err => {
    return res.status(400).json({ error: err.message });
  });
});

pages.get('/:slug', (req, res) => {
  models.page.findOne({
    where: {
      slug: req.params.slug,
    },
    attributes: {exclude: ['autherId']},
    include: [
      {
        model: models.auther,
        attributes: ['id', 'displayName'],
      },
    ],
  }).then(page => {
    return res.json(page);
  }).catch(err => {
    console.log(`[ERROR]: ${err.message}`);

    return res.status(503).json({ error: 'Service unavailable!' });
  });
});

pages.patch('/:id', (req, res) => {
  const { id, autherId, ...body } = req.body;

  models.page.update(body, {
    where: { id: req.params.id },
  }).then(() => {
    return res.status(201).send();
  }).catch(err => {
    return res.status(400).json({ error: err.message });
  });
});

pages.delete('/:id', (req, res) => {
  models.page.destroy({
    where: {
      id: req.params.id,
    }
  }).then(() => {
    return res.status(204).send();
  }).catch(err => {
    console.log(`[ERROR]: ${err.message}`);

    return res.status(503).json({ error: 'Service unavailable!' });
  });
});

module.exports = pages;
