const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('settings', {
    footer: DataTypes.STRING,
    mastodon: DataTypes.STRING,
    matrix: DataTypes.STRING,
    xmpp: DataTypes.STRING,
    email: DataTypes.STRING,
  });
};
