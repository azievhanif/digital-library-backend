const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const logger = require('./config/logger');

const User = require('./models/user');
const Book = require('./models/book');
const Borrowing = require('./models/borrowing');

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const borrowingRoutes = require('./routes/borrowingRoutes');

const app = express();
const port = process.env.PORT || 3001;
const jwtSecret = process.env.JWT_SECRET;

app.use(cors());
app.use(logger);
app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/borrowings', borrowingRoutes);

app.get('/', (req, res) => {
  res.send({
    message: 'Hi! 👋',
    status: 'Server is ready 🚀',
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Terjadi kesalahan pada server' 
  });
});

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database berhasil disinkronkan');
  } catch (error) {
    console.error('Gagal sinkronisasi database:', error);
    process.exit(1);
  }
};

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Koneksi database berhasil');
    
    await syncDatabase();
    
    app.listen(port, () => {
      console.log(`Server berjalan di port ${port}`);
    });
  } catch (error) {
    console.error('Gagal inisialisasi server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;