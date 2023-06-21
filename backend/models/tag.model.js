const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Tag', {
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
};
