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

const makeCategory = require('./models/Category');
const Category = makeCategory(sequelize);

const makeTag = require('./models/Tag');
const Tag = makeTag(sequelize);

const makeAuther = require('./models/Auther');
const Auther = makeAuther(sequelize);

const makePage = require('./models/Page');
const Page = makePage(sequelize);
Auther.hasMany(Page, {
  foreignKey: {
    allowNull: false,
  },
});
Page.belongsTo(Auther);

const makePost = require('./models/Post');
const Post = makePost(sequelize);
Auther.hasMany(Post, {
  foreignKey: {
    allowNull: false,
  },
});
Post.belongsTo(Auther);

const PostTags = sequelize.define('PostTags', {}, { timestamps: false });
Post.belongsToMany(Tag, { through: PostTags });
Tag.belongsToMany(Post, { through: PostTags });

const PostCategories = sequelize.define('PostCategories', {}, { timestamps: false });
Post.belongsToMany(Category, { through: PostCategories });
Category.belongsToMany(Post, { through: PostCategories });

sequelize.sync({
  force: true,
}).then(() => {
  Auther.create({
    email: 'mytestemail@gmail.com',
    password: 'Password',
    displayName: 'My Name',
  }).then(() => {
    Post.create({
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

module.exports = {
  sequelize,
};
