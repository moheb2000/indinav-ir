const { DataTypes } = require('sequelize'); 

module.exports = (sequelize) => {
  return sequelize.define('Category', {
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
