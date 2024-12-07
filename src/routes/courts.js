const express = require('express');
const router = express.Router();
const courtController = require('../controllers/courtController');

/**
 * @swagger
 * tags:
 *   name: Courts
 *   description: Gestion des terrains de badminton
 */

/**
 * @swagger
 * /courts:
 *   get:
 *     summary: Récupérer tous les terrains
 *     tags: [Courts]
 *     responses:
 *       200:
 *         description: Liste des terrains.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID du terrain
 *                   name:
 *                     type: string
 *                     description: Nom du terrain
 *                   status:
 *                     type: string
 *                     description: Statut du terrain
 */
router.get('/', courtController.getCourts);

/**
 * @swagger
 * /courts:
 *   post:
 *     summary: Ajouter un nouveau terrain
 *     tags: [Courts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom du terrain
 *               status:
 *                 type: string
 *                 description: Statut du terrain
 *     responses:
 *       201:
 *         description: Terrain créé avec succès.
 *       400:
 *         description: Erreur de validation.
 */
router.post('/', courtController.createCourt);

module.exports = router;
