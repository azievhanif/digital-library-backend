const express = require('express');
const sequelize = require('./config/database');
const server = require('./server');


const User = require('./models/user');
const Book = require('./models/book');
const Borrowing = require('./models/borrowing');


const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database berhasil disinkronkan');
  } catch (error) {
    console.error('Gagal sinkronisasi database:', error);
    process.exit(1);
  }
};

sequelize.authenticate()
  .then(() => {
    console.log('Koneksi database berhasil');
    return syncDatabase();
  })
  .then(() => {
    server.start();
  })
  .catch((error) => {
    console.error('Gagal inisialisasi:', error);
  });