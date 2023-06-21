const express = require('express');

const { models } = require('../models/db');

const posts = express.Router();

posts.get('/', (req, res) => {
  const { page } = req.query;
  models.post.findAndCountAll({
    offset: 6 * ((page || 1) - 1),
    limit: 6,
    order: [
      ['createdAt', 'DESC'],
    ],
    attributes: {exclude: ['autherId']},
    include: [
      {
        model: models.auther,
        attributes: ['id', 'displayName'],
      },
    ],
  }).then(posts => {
    res.json(posts);
  }).catch(err => {
    console.log(`[ERROR]: ${err.message}`);

    res.status(503).json({ error: 'Service unavailable!' });
  });
});

posts.post('/', (req, res) => {
  const { id, ...body } = req.body;

  models.post.create(body).then(() => {
    res.status(201).send();
  }).catch(err => {
    res.status(400).json({ error: err.message });
  });
});

posts.get('/:id', (req, res) => {
  models.post.findByPk(req.params.id, {
    attributes: {exclude: ['autherId']},
    include: [
      {
        model: models.auther,
        attributes: ['id', 'displayName'],
      },
    ],
  }).then(post => {
    res.json(post);
  }).catch(err => {
    console.log(`[ERROR]: ${err.message}`);

    res.status(503).json({ error: 'Service unavailable!' });
  });
});

posts.patch('/:id', (req, res) => {
  const { id, autherId, ...body } = req.body;

  models.post.update(body, {
    where: { id: req.params.id },
  }).then(() => {
    res.status(201).send();
  }).catch(err => {
    res.status(400).json({ error: err.message });
  });
});

posts.delete('/:id', (req, res) => {
  models.post.destroy({
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

module.exports = posts;
