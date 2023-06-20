const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Page', {
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
};
