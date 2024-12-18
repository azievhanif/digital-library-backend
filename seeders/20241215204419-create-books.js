'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const books = await queryInterface.bulkInsert('Books', [
      {
        id: uuidv4(),
        title: 'The Great Gatsby',
        description: 'A classic American novel by F. Scott Fitzgerald.',
        genre: 'Fiction',
        status: 'available',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'To Kill a Mockingbird',
        description: 'A novel by Harper Lee that explores racial injustice in the American South.',
        genre: 'Fiction',
        status: 'available',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'One Hundred Years of Solitude',
        description: 'A magical realism novel by Gabriel García Márquez.',
        genre: 'Fiction',
        status: 'available',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}, { returning: ['id']});
    return books;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Books', null, {});
  }
};