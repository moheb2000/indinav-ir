const { DataTypes } = require('sequelize');

const { sequelize } = require('../app');

const Tag = sequelize.define('Tag', {
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Tag;
