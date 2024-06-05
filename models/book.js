const { Sequelize, DataTypes } = require("sequelize");

const Author = require("./author");
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: DataTypes.STRING,
  summary: DataTypes.STRING,
  authId: {
    type: DataTypes.INTEGER,
    references: {
      model: Author,
      key: 'id'
    }
  }
});

Book.belongsTo(Author, { foreignKey: 'authId' });
Author.hasMany(Book, { foreignKey: 'authId' });

sequelize.sync({ force: true }).then(() => {
    console.log("Create tables ");
  });
module.exports = Book