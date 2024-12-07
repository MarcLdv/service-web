'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // Données initiales
    await queryInterface.bulkInsert('Courts', [
      {
        name: 'Court 1',
        status: 'available',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Court 2',
        status: 'unavailable',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Courts', null, {});
  }
};
