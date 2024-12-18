const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const logger = require('./config/logger');

// Import models
const User = require('./models/user');
const Book = require('./models/book');
const Borrowing = require('./models/borrowing');

// Import routes
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const borrowingRoutes = require('./routes/borrowingRoutes');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(logger);
app.use(express.json());

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/borrowings', borrowingRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send({
    message: 'Hi! 👋',
    status: 'Server is ready 🚀',
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Terjadi kesalahan pada server' 
  });
});

// Database sync function
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database berhasil disinkronkan');
  } catch (error) {
    console.error('Gagal sinkronisasi database:', error);
    process.exit(1);
  }
};

// Start server function
const startServer = async () => {
  try {
    // Authenticate database connection
    await sequelize.authenticate();
    console.log('Koneksi database berhasil');
    
    // Sync database
    await syncDatabase();
    
    // Start server
    app.listen(port, () => {
      console.log(`Server berjalan di port ${port}`);
    });
  } catch (error) {
    console.error('Gagal inisialisasi server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

module.exports = app;