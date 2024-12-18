const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Book = require('./book');

const Borrowing = sequelize.define('Borrowing', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  borrowDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  returnDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('active', 'returned'),
    defaultValue: 'active'
  }
}, {
  timestamps: true
});

Borrowing.belongsTo(User, { 
  foreignKey: 'userId', 
  onDelete: 'CASCADE' 
});

Borrowing.belongsTo(Book, { 
  foreignKey: 'bookId', 
  onDelete: 'CASCADE' 
});

User.hasMany(Borrowing, { 
  foreignKey: 'userId' 
});

Book.hasMany(Borrowing, { 
  foreignKey: 'bookId' 
});

module.exports = Borrowing;