const { Sequelize, DataTypes } = require('sequelize');
const dBConnection = require('../config/database');
const sequelize = new Sequelize(dBConnection);

const bcrypt = require('bcryptjs');


const Users = sequelize.define('Users', {
  // Model attributes are defined here
  id : {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name : {
    type : DataTypes.STRING,
    allowNull:false
  },
  email : {
    type: DataTypes.STRING,
    unique:true,
    allowNull:false,
  },
  password :{
    type: DataTypes.STRING,
    allowNull: false,
    
  }
});

Users.beforeCreate(async (user, options) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
  
});


// `sequelize.define` also returns the model
console.log(Users === sequelize.models.Users);

module.exports = Users;