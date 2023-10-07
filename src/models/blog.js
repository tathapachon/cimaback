const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  const Blog = sequelize.define('blog', {
    formData: {
      type: Sequelize.JSON,
      allowNull: false,
    },
  });

  return Blog;
};
