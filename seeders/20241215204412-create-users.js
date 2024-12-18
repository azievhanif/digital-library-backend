'use strict';
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash('password123', 10);

    const users = await queryInterface.bulkInsert('Users', [
      // {
      //   id: uuidv4(),
      //   name: 'John Doe',
      //   email: 'john@example.com',
      //   password,
      //   role: 'admin',
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   id: uuidv4(),
      //   name: 'Jane Smith',
      //   email: 'jane@example.com',
      //   password,
      //   role: 'member',
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      {
        id: uuidv4(),
        name: 'Aziev Hanif',
        email: 'aziev@example.com',
        password,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}, { returning: ['id']});
    return users;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};