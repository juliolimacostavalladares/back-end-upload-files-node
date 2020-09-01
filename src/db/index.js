const Sequelize = require("sequelize");
const dBConnection = require("../config/database");

const connection = new Sequelize(dBConnection);

module.exports = connection;
