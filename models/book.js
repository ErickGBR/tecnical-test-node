const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: DataTypes.STRING,
  summary: DataTypes.STRING,
  authId: DataTypes.INTEGER
});



module.exports = Book