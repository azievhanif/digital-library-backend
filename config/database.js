const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.PGDATABASE, 
  process.env.PGUSER, 
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: 'postgres',
    dialectModule: require('pg'),
    dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
    },
    logging: false
  }  
);

module.exports = sequelize;