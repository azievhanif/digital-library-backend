const express = require('express');
const cors = require('cors');
const logger = require('./config/logger');

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const borrowingRoutes = require('./routes/borrowingRoutes');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(logger);
app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/borrowings', borrowingRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Terjadi kesalahan pada server' 
  });
});


const start = () => {

  app.get('/', (req, res) => {
    res.send({
      message: 'Hi! 👋',
      status: 'Server is ready 🚀',
    })
  })

  app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
  });
};

module.exports = { app, start };