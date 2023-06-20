const { DataTypes } = require('sequelize');

const { sequelize } = require('../app');
const Auther = require('./Auther');

const Page = sequelize.define('Page', {
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

Page.hasOne(Auther, {
  foreignKey: {
    allowNull: false,
  },
});
Auther.belongsTo(Post);

module.exports = Page;
