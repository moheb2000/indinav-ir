const express = require('express');

const { models } = require('../models/db');
const authenticate = require('../middlewares/authenticate');

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
    return res.json(posts);
  }).catch(err => {
    console.log(`[ERROR]: ${err.message}`);

    return res.status(503).json({ error: 'Service unavailable!' });
  });
});

posts.post('/', authenticate, (req, res) => {
  const { id, autherId, ...body } = req.body;
  models.post.create({ autherId: req.autherId, ...body }).then(() => {
    return res.status(201).send();
  }).catch(err => {
    return res.status(400).json({ error: err.message });
  });
});

posts.get('/:slug', (req, res) => {
  models.post.findOne({
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
  }).then(post => {
    return res.json(post);
  }).catch(err => {
    console.log(`[ERROR]: ${err.message}`);

    return res.status(503).json({ error: 'Service unavailable!' });
  });
});

posts.patch('/:slug', authenticate, (req, res) => {
  const { id, autherId, ...body } = req.body;

  models.post.update(body, {
    where: { slug: req.params.slug },
  }).then(() => {
    return res.status(201).send();
  }).catch(err => {
    return res.status(400).json({ error: err.message });
  });
});

posts.delete('/:slug', authenticate, (req, res) => {
  models.post.destroy({
    where: {
      slug: req.params.slug,
    }
  }).then(() => {
    return res.status(204).send();
  }).catch(err => {
    console.log(`[ERROR]: ${err.message}`);

    return res.status(503).json({ error: 'Service unavailable!' });
  });
});

module.exports = posts;
