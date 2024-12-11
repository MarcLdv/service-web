const { Reservation, Court, Slots } = require('../models');
const { Op } = require('sequelize');

const resolvers = {
    Query: {
        availableSlots: async (_, { date, terrain }) => {
            try {
                // Find court by name
                const court = await Court.findOne({ where: { name: terrain } });
                if (!court) throw new Error(`Court does not exist`);

                // Generate time slots
                const startHour = 10; // 10h UTC
                const slotDuration = 45; // 45 minutes
                const timeSlots = Array.from({ length: 16 }, (_, i) => {
                    const start = new Date(`${date}T${String(startHour + Math.floor(i * slotDuration / 60)).padStart(2, '0')}:${String((i * slotDuration) % 60).padStart(2, '0')}:00.000Z`);
                    const end = new Date(start.getTime() + slotDuration * 60000);
                    return { start, end };
                });

                // Find available slots
                const slots = await Slots.findAll({
                    where: {
                        courtId: court.id,
                        schedule: {
                            [Op.between]: [
                                new Date(`${date}T00:00:00.000Z`),
                                new Date(`${date}T23:59:59.999Z`)
                            ]
                        },
                        status: 'available'
                    }
                });


                // Find reserved slots
                const reservedSlotIds = (await Reservation.findAll({
                    where: { slotId: slots.map(slot => slot.id) },
                })).map(reservation => reservation.slotId);

                return slots
                    .filter(slot => !reservedSlotIds.includes(slot.id))
                    .map(slot => ({
                        time: `${slot.schedule.getUTCHours()}:${String(slot.schedule.getUTCMinutes()).padStart(2, '0')}-${new Date(slot.schedule.getTime() + slotDuration * 60000).getUTCHours()}:${String(new Date(slot.schedule.getTime() + slotDuration * 60000).getUTCMinutes()).padStart(2, '0')}`,
                        date: date,
                    }));
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching available slots');
            }
        },
    },
};

module.exports = resolvers;
