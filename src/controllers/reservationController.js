const { Reservation, Court, User } = require('../models');
const { Op } = require('sequelize');

// Créer une réservation
const createReservation = async (req, res) => {
    const { courtId, date, timeSlot } = req.body;
    const userId = req.user.id;

    try {
        const today = new Date();
        const reservationDate = new Date(date);

        if (reservationDate < today.setHours(0, 0, 0, 0)) {
            return res.status(400).json({ message: 'Reservation date cannot be in the past' });
        }

        if (timeSlot > 16 || timeSlot < 1) {
            return res.status(400).json({ message: 'Time slot not valid. Try a value between 1 and 16.' });
        }

        const court = await Court.findByPk(courtId);
        if (!court) {
            return res.status(404).json({ message: 'Court not found' });
        }

        if (court.status !== 'available') {
            return res.status(400).json({ message: 'Court is not available' });
        }

        const existingReservation = await Reservation.findOne({
            where: { courtId, date, timeSlot },
        });

        if (existingReservation) {
            return res.status(400).json({ message: 'Time slot already booked' });
        }

        const reservation = await Reservation.create({
            userId,
            courtId,
            date,
            timeSlot,
        });

        res.status(201).json(reservation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating reservation', error });
    }
};

// Récupérer les réservations de l'utilisateur connecté
const getUserReservations = async (req, res) => {
    const userId = req.user.id;

    try {
        const reservations = await Reservation.findAll({
            where: { userId },
            include: [Court],
        });

        res.status(200).json(reservations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching reservations', error });
    }
};

module.exports = {
    createReservation,
    getUserReservations,
};
