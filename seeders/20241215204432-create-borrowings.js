'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM "Users"',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const books = await queryInterface.sequelize.query(
      'SELECT id FROM "Books"',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    await queryInterface.bulkInsert('Borrowings', [
      {
        id: uuidv4(),
        userId: users[0].id,
        bookId: books[0].id,
        borrowDate: new Date(),
        returnDate: null,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        userId: users[1].id,
        bookId: books[1].id,
        borrowDate: new Date(),
        returnDate: null,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Borrowings', null, {});
  }
};