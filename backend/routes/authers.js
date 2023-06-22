const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { models } = require('../models/db');

const authers = express.Router();

authers.post('/checklogin', (req, res) => {
  try {
    const decoded = jwt.verify(req.body.token, 'hello');
    return res.json({ verify: true });
  } catch(err) {
    return res.json({ verify: false });
  }
});

authers.post('/login', (req, res) => {
  if (!req.body.email) return res.status(400).json({ error: 'وارد کردن ایمیل الزامی است!' });
  if (!req.body.password) return res.status(400).json({ error: 'وارد کردن گذرواژه الزامی است!' });

  models.auther.findOne({
    where: {
      email: req.body.email,
    },
  }).then(auther => {
    if (auther === null) return res.status(400).json({ error: 'ایمیل وارد شده اشتباه است!' });
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
        return res.status(400).json({ error: 'گذرواژه وارد شده اشتباه است!' });
      }
    });
  }).catch(err => {
    console.log(`[ERROR]: ${err.message}`);

    return res.status(503).json({ error: 'Service unavailable!' });
  });
});

module.exports = authers;
