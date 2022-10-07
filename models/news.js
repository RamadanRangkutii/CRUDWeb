module.exports = (sequelize, Sequelize) => {
	const News = sequelize.define("news", {
		title: {
			type: Sequelize.TEXT
		},
		image: {
			type: Sequelize.STRING
		},
    content: {
			type: Sequelize.TEXT
		}
  }); 
	
	return News;
};