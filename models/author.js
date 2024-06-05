const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../config/database');
const Author = sequelize.define('Author', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  bio: DataTypes.TEXT,
});

sequelize.sync({ force: true }).then(() => {
    console.log("Create tables ");
  });
  
module.exports = Author

