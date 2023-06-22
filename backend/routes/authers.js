const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { models } = require('../models/db');

const authers = express.Router();

authers.post('/checklogin', (req, res) => {
  try {
    decoded = jwt.verify(req.body.token, 'hello');
    return res.json({ verify: true });
  } catch(err) {
    return res.json({ verify: false });
  }
});

authers.post('/login', (req, res) => {
  if (!req.body.email) return res.status(400).json({ error: 'Email parameter required!' });
  if (!req.body.password) return res.status(400).json({ error: 'Password parameter required!' });

  models.auther.findOne({
    where: {
      email: req.body.email,
    },
  }).then(auther => {
    if (auther === null) return res.json({ error: 'Wrong email!' });
    bcrypt.compare(req.body.password, auther.password, (err, result) => {
      if (err) {
        console.log(`[ERROR]: ${err.message}`);

        return res.status(503).json({ error: 'Service unavailable!' });
      }

      if (result) {
        const token = jwt.sign({ autherId: auther.id }, 'hello', { expiresIn: '3d' });
        res.cookie('token', token, { httpOnly: true });
        return res.json({ token });
      } else {
        return res.status(400).json({ error: 'Wrong password!' });
      }
    });
  }).catch(err => {
    console.log(`[ERROR]: ${err.message}`);

    return res.status(503).json({ error: 'Service unavailable!' });
  });
});

module.exports = authers;
