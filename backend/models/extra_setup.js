function applyExtraSetup(sequelize) {
	const { auther, page, post } = sequelize.models;

	auther.hasMany(page, {
    foreignKey: {
      allowNull: false,
    },
  });
  page.belongsTo(auther);

  auther.hasMany(post, {
    foreignKey: {
      allowNull: false,
    },
  });
  post.belongsTo(auther);
}

module.exports = { applyExtraSetup };
