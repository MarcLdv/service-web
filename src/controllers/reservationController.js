const { Reservation, Court, Slots, User } = require('../models');
const { Op } = require('sequelize');

// Créer une réservation
const createReservation = async (req, res) => {
    const courtId  = req.body.courtId;
    const slotId = req.body.slotId;
    const userId = req.user.id;

    try {
        // Recherche du terrain par ID
        const court = await Court.findByPk(courtId);
        if (!court) {
            return res.status(404).json({ message: `Court with ID "${courtId}" not found` });
        }

        if (court.status !== 'available') {
            return res.status(400).json({ message: 'Court is not available' });
        }

        // Vérifie si le créneau est déjà réservé
        const slot = await Slots.findOne({
            where: { id: slotId, courtId: court.id, status: 'available' },
        });

        if (!slot) {
            return res.status(400).json({ message: 'Time slot already booked or not available' });
        }

        // Crée la réservation
        const reservation = await Reservation.create({
            userId,
            slotId: slot.id,
            courtId: court.id,
        });

        // Update slot status
        slot.status = 'unavailable';
        await slot.save();

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
            include: [
                {
                    model: Slots,
                    include: [Court]
                }
            ],
        });

        const formattedReservations = reservations.map(reservation => ({
            id: reservation.id,
            courtName: reservation.Slot.Court.name,
            slotName: reservation.Slot.name,
            schedule: reservation.Slot.schedule,
        }));

        res.status(200).json(formattedReservations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching reservations', error });
    }
};

// Supprimer une réservation
const deleteReservation = async (req, res) => {
    const userId = req.user.id;
    const { reservationId } = req.params;

    try {
        const reservation = await Reservation.findByPk(reservationId, {
            include: [Slots]
        });

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        if (reservation.userId !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this reservation' });
        }

        await reservation.destroy();

        // Update slot status
        const slot = await Slots.findByPk(reservation.slotId);
        slot.status = 'available';
        await slot.save();

        res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting reservation', error });
    }
};

module.exports = {
    createReservation,
    getUserReservations,
    deleteReservation,
};