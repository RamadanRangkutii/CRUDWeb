const { Sequelize, DataTypes } = require('sequelize');

// sql server
const sequelize = new Sequelize('NodeDB', 'ramadan', '1234', {
	dialect: 'mssql',
	//host: "192.168.xx",
	dialectOptions: {
	  // Observe the need for this nested `options` field for MSSQL
	  options: {
		// Your tedious options here
		useUTC: false,
		dateFirst: 1,
	  },
	},
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.newss = require('./news')(sequelize, Sequelize);
db.comments = require('./comment')(sequelize, Sequelize);

module.exports = db;