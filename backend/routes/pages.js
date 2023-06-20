const express = require('express');

const pages = express.Router();

pages.get('/', (req, res) => {});

pages.post('/', (req, res) => {});

pages.get('/:id', (req, res) => {});

pages.patch('/:id', (req, res) => {});

module.exports = pages;
