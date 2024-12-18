const Book = require('../models/book');
const { Op } = require('sequelize');

exports.createBook = async (req, res) => {
  try {
    const { title, description, genre } = req.body;

    const book = await Book.create({
      title,
      description,
      genre,
      status: 'available'
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ 
      message: 'Gagal menambahkan buku', 
      error: error.message 
    });
  }
};

exports.searchBooks = async (req, res) => {
  try {
    const { query, genre, status } = req.query;
    const whereCondition = {};

    if (query) {
      whereCondition[Op.or] = [
        { title: { [Op.iLike]: `%${query}%` } },
        { description: { [Op.iLike]: `%${query}%` } }
      ];
    }

    if (genre) whereCondition.genre = genre;
    if (status) whereCondition.status = status;

    const books = await Book.findAll({
      where: whereCondition,
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ 
      message: 'Gagal mencari buku', 
      error: error.message 
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, genre } = req.body;

    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }

    await book.update({ title, description, genre });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ 
      message: 'Gagal memperbarui buku', 
      error: error.message 
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }

    await book.destroy();
    res.status(200).json({ message: 'Buku berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Gagal menghapus buku', 
      error: error.message 
    });
  }
};