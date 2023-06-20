const { DataTypes } = require('sequelize');

const { sequelize } = require('../app');

const Category = sequelize.define('Category', {
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

module.exports = Category;
