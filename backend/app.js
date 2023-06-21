const express = require('express');
const sequelize = require('./models/db');

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

sequelize.sync({
  force: true,
}).then(() => {
  sequelize.models.Auther.create({
    email: 'mytestemail@gmail.com',
    password: 'Password',
    displayName: 'My Name',
  }).then(() => {
    sequelize.models.Post.create({
      slug: 'hello',
      title: 'hello',
      body: 'hello',
      AutherId: 1,
    });
  });
}).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(err => {
  console.log(err);
});
