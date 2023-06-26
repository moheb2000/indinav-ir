const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const sequelize = require('./models/db');
const posts = require('./routes/posts');
const pages = require('./routes/pages');
const authers = require('./routes/authers');
const settings = require('./routes/settings');
const feed = require('./routes/feed');

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
app.use('/api/settings', settings);

app.use('/feed.xml', feed);

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

  sequelize.models.settings.findAll().then(settings => {
    if (settings.length <= 0) {
      sequelize.models.settings.create({
        footer: 'تمام مطالب این سایت تحت پروانه CC BY-SA منتشر می شوند.',
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
