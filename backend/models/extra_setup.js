function applyExtraSetup(sequelize) {
	const { Category, Tag, Auther, Page, Post } = sequelize.models;

	Auther.hasMany(Page, {
    foreignKey: {
      allowNull: false,
    },
  });
  Page.belongsTo(Auther);

  Auther.hasMany(Post, {
    foreignKey: {
      allowNull: false,
    },
  });
  Post.belongsTo(Auther);

  Post.belongsToMany(Tag, { through: 'PostTags' });
  Tag.belongsToMany(Post, { through: 'PostTags' });

  Post.belongsToMany(Category, { through: 'PostCategories' });
  Category.belongsToMany(Post, { through: 'PostCategories' });
}

module.exports = { applyExtraSetup };
