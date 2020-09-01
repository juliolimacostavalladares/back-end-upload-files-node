const { Sequelize, DataTypes } = require('sequelize');
const dBConnection = require('../config/database')
const sequelize = new Sequelize(dBConnection);

const Uploads = sequelize.define('Uploads', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  size: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },

});

// `sequelize.define` also returns the model
console.log(Uploads === sequelize.models.Uploads);

module.exports = Uploads;