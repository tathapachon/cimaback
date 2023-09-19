const { DataTypes, Sequelize } = require('sequelize');



module.exports = (sequelize) => {
    const Article = sequelize.define('article', {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            unique: true,
            primaryKey: true,
          },
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false
        }
      });
        // Retorna el modelo
        return Article
  };









