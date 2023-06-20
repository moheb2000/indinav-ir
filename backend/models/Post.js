const { DataTypes } = require('sequelize');

const { sequelize } = require('../app');
const Auther = require('./Auther');
const Tag = require('./Tag');
const Category = require('./Category');

const Post = sequelize.define('Post', {
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  cover: DataTypes.STRING,
});

Post.hasOne(Auther, {
  foreignKey: {
    allowNull: false,
  },
});
Auther.belongsTo(Post);

Post.belongsToMany(Tag, { through: 'PostTags' });
Tag.belongsToMany(Post, { through: 'PostTags' });

Post.belongsToMany(Category, { through: 'PostCategories' });
Category.belongsToMany(Post, { through: 'PostCategories' });

module.exports = Post;
