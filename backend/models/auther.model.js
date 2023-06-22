const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

function generateHash(auther) {
  if (!auther.changed('password')) {
    return auther.password;
  } else {
      let salt = bcrypt.genSaltSync();
      return auther.password = bcrypt.hashSync(auther.password, salt);
  }
}

module.exports = (sequelize) => {
  sequelize.define('auther', {
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
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    hooks: {
      beforeCreate: generateHash,
      beforeUpdate: generateHash,
    },
  });
};

