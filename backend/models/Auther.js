const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Auther', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 8,
      },
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

