const Book = require('../models/book');
const User = require('../models/user');
const Borrowing = require('../models/borrowing');
const sequelize = require('../config/database');

exports.borrowBook = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { bookId } = req.body;
    const userId = req.user.id;

    const book = await Book.findByPk(bookId, { transaction });
    if (!book) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }

    if (book.status !== 'available') {
      await transaction.rollback();
      return res.status(400).json({ message: 'Buku sudah dipinjam' });
    }

    const activeBorrowings = await Borrowing.count({
      where: { 
        userId, 
        status: 'active' 
      },
      transaction
    });

    if (activeBorrowings >= 3) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Anda sudah meminjam 3 buku' });
    }

    const borrowing = await Borrowing.create({
      userId,
      bookId,
      borrowDate: new Date(),
      status: 'active'
    }, { transaction });

    await book.update({ status: 'borrowed' }, { transaction });

    await transaction.commit();

    res.status(201).json({
      message: 'Buku berhasil dipinjam',
      borrowing: {
        id: borrowing.id,
        bookId: borrowing.bookId,
        borrowDate: borrowing.borrowDate
      }
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ 
      message: 'Gagal meminjam buku', 
      error: error.message 
    });
  }
};

exports.returnBook = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { borrowingId } = req.body;
    const userId = req.user.id;

    const borrowing = await Borrowing.findOne({
      where: { 
        id: borrowingId, 
        userId, 
        status: 'active' 
      },
      include: [Book],
      transaction
    });

    if (!borrowing) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Peminjaman tidak ditemukan' });
    }

    await borrowing.update({
      returnDate: new Date(),
      status: 'returned'
    }, { transaction });

    await borrowing.Book.update(
      { status: 'available' }, 
      { transaction }
    );

    await transaction.commit();

    res.status(200).json({
      message: 'Buku berhasil dikembalikan',
      borrowing: {
        id: borrowing.id,
        bookId: borrowing.bookId,
        returnDate: borrowing.returnDate
      }
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ 
      message: 'Gagal mengembalikan buku', 
      error: error.message 
    });
  }
};

exports.getUserBorrowings = async (req, res) => {
  try {
    const userId = req.user.id;

    const borrowings = await Borrowing.findAll({
      where: { userId },
      include: [
        {
          model: Book,
          attributes: ['id', 'title', 'genre']
        }
      ],
      order: [['borrowDate', 'DESC']]
    });

    res.status(200).json(borrowings);
  } catch (error) {
    res.status(500).json({ 
      message: 'Gagal mengambil daftar peminjaman', 
      error: error.message 
    });
  }
};