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
