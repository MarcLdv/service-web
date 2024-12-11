'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const slots = [];
    const numberOfWeeks = 4; // Define the number of weeks
    const startDate = new Date();
    const dayOfWeek = startDate.getDay();
    const startOfWeek = new Date(startDate.setDate(startDate.getDate() - dayOfWeek + 1)); // Set to Monday

    // Fetch court IDs
    const courts = await queryInterface.sequelize.query(
      'SELECT id FROM "Courts";',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    for (let week = 0; week < numberOfWeeks; week++) {
      for (let court of courts) {
        for (let day = 0; day < 6; day++) { // Monday to Saturday
          for (let slot = 0; slot < 16; slot++) { // 16 slots per day
            const slotTime = new Date(startOfWeek);
            slotTime.setDate(startOfWeek.getDate() + day + week * 7);
            slotTime.setUTCHours(10, 0, 0, 0); // Start at 10 AM UTC
            slotTime.setUTCMinutes(slotTime.getUTCMinutes() + slot * 45);

            slots.push({
              name: `Slot ${week * 96 + day * 16 + slot + 1}`,
              schedule: slotTime,
              status: 'available',
              courtId: court.id, 
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          }
        }
      }
    }

    await queryInterface.bulkInsert('Slots', slots, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Slots', null, {});
  }
};
