const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const sequelize = require('./models/db');
const posts = require('./routes/posts');
const pages = require('./routes/pages');
const authers = require('./routes/authers');

require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/assets', express.static(path.join(__dirname, 'dist/assets')));

app.use('/api/authers', authers);
app.use('/api/posts', posts);
app.use('/api/pages', pages);

app.get('/*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

sequelize.sync({
  logging: false,
}).then(() => {
  sequelize.models.auther.findAll().then(authers => {
    if (authers.length <= 0) {
      sequelize.models.auther.create({
        email: process.env.AUTHER_EMAIL,
        password: process.env.AUTHER_PASSWORD,
        displayName: process.env.AUTHER_NAME,
      });
    }
  });
}).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(err => {
  console.log(err);
});
