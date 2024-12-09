'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   // Données initiales
   await queryInterface.bulkInsert('Admin', [
     {
       pseudo: 'admybad',
       password: '$2y$10$wD/UKq2xVeofwFGO5pkGxuD4xDI1XBP8IbATT.hTvAdTxWPW.9meW',
       createdAt: new Date(),
       updatedAt: new Date()
     }
   ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admin', null, {});
  }
};
