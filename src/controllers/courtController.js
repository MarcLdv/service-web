const { Court } = require('../models');

// Ajouter un terrain
exports.createCourt = async (req, res) => {
    try {
        const { name, status } = req.body; // Récupérer les données envoyées par le client
        const newCourt = await Court.create({ name, status }); // Créer un terrain
        res.status(201).json(newCourt); // Retourner les données du terrain créé
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer tous les terrains
exports.getCourts = async (req, res) => {
    try {
        const courts = await Court.findAll(); // Récupérer tous les terrains
        res.json(courts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fonction pour récupérer un terrain via son ID
exports.getCourtById = async (req, res) => {
    try {
        const { id } = req.params; // Récupère l'ID depuis les paramètres de l'URL
        const court = await Court.findByPk(id); // Recherche le court par ID

        if (!court) {
            return res.status(404).json({ message: 'Court not found' });
        }

        res.status(200).json(court);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
};

// Fonction pour mettre à jour un terrain
exports.updateCourt = async (req, res) => {
    try {
        const { id } = req.params; // Récupérer l'ID du court
        const { name, status } = req.body; // Récupérer les nouvelles données

        const court = await Court.findByPk(id);
        if (!court) {
            return res.status(404).json({ message: 'Court not found' });
        }

        court.name = name || court.name;
        court.status = status || court.status;

        await court.save();

        res.status(200).json({
            message: 'Court updated successfully',
            court,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};