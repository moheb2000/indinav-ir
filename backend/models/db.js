const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra_setup');

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './db/db.sqlite',
});

const modelDefiners = [
	require('./auther.model'),
	require('./category.model'),
	require('./tag.model'),
	require('./page.model'),
	require('./post.model'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
