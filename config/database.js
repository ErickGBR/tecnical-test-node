// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data/database.sqlite',
  define: {
    timestamps: true, 
    underscored: true,
  },
  logging: false
});

module.exports = sequelize;
