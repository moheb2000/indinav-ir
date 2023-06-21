const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./models/db');
const posts = require('./routes/posts');
const pages = require('./routes/pages');

const _posts = require('./models/test-data.json')

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/assets', express.static(__dirname + '/dist/assets'));

app.use('/api/posts', posts);
app.use('/api/pages', pages);

app.get('/', (_req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

sequelize.sync({
  force: true,
}).then(() => {
  sequelize.models.auther.create({
    email: 'mytestemail@gmail.com',
    password: 'Password',
    displayName: 'My Name',
  }).then(() => {
    sequelize.models.post.bulkCreate(_posts, { validate: true });
  });
}).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(err => {
  console.log(err);
});
