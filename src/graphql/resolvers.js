const { Reservation, Court } = require('../models');

const resolvers = {
    Query: {
        availableSlots: async (_, { date, terrain }) => {
            try {
                const court = await Court.findOne({ where: { name: terrain } });
                if (!court) throw new Error(`Court with name "${terrain}" not found`);

                const timeSlots = Array.from({ length: 16 }, (_, i) => i + 1);
                const reservations = await Reservation.findAll({
                    where: { courtId: court.id, date },
                });
                const reservedSlots = reservations.map((r) => r.timeSlot);

                return timeSlots.map((slot) => ({
                    time: `${slot}:00-${slot + 1}:00`,
                    isAvailable: !reservedSlots.includes(slot),
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
