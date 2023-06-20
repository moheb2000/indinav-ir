const express = require('express');
const { Sequelize } = require('sequelize');

const posts = require('./routes/posts');
const pages = require('./routes/pages');


const app = express();
const port = 3000;

app.use('/assets', express.static(__dirname + '/dist/assets'));

app.use('/api/posts', posts);
app.use('/api/pages', pages);

app.get('/', (_req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/db.sqlite',
});

sequelize.sync({
  force: true,
}).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(err => {
  console.log(err);
});

module.exports = {
  sequelize,
};
