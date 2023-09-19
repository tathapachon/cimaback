const {DataTypes, Sequelize } = require('sequelize');


module.exports = (sequelize) => {
  const Service = sequelize.define('service', {
    // Define los campos de la tabla
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    service: {
      type: Sequelize.STRING,
      allowNull: false,
    }

  });




  // Retorna el modelo
  return Service
}