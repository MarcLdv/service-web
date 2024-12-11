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
 * components:
 *   schemas:
 *     Terrain:
 *       type: object
 *       required:
 *         - username
 *       properties:
 *         id:
 *           type: integer
 *           description: Identifiant unique du terrain
 *         name:
 *           type: string
 *           description: Nom d'utilisateur
 *         status:
 *           type: string
 *           description: Nom d'utilisateur
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création de l'utilisateur
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Dernière mise à jour de l'utilisateur
 *       example:
 *         id: 1
 *         name: "A"
 *         status: "available"
 *         createdAt: "2024-12-01T12:00:00Z"
 *         updatedAt: "2024-12-01T12:00:00Z"
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
 * /courts/{id}:
 *   get:
 *     tags: [Courts]
 *     summary: Récupérer un court spécifique par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du court
 *     responses:
 *       200:
 *         description: Court trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 status:
 *                   type: string
 *       404:
 *         description: Court non trouvé
 */
router.get('/:id', courtController.getCourtById);

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
