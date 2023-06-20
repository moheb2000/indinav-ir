const express = require('express');

const posts = express.Router();

posts.get('/', (req, res) => {});

posts.post('/', (req, res) => {});

posts.get('/:id', (req, res) => {});

posts.patch('/:id', (req, res) => {});

module.exports = posts;
