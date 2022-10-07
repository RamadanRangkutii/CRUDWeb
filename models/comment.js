module.exports = (sequelize, Sequelize) => {
	const Comment = sequelize.define("comment", {
		name: {
			type: Sequelize.STRING
		},
		comment: {
			type: Sequelize.TEXT
		},

	});
	return Comment;
};