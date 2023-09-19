const {DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    // Define los campos de la tabla
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
   name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    // ...
  });

  // Define los métodos de instancia del modelo
  User.prototype.isValidPassword =async function (password) {
    const isValid = await bcrypt.compare(password, this.password);
    return isValid;
  };

  // Retorna el modelo
  return User;
};