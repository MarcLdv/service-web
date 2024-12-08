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

/**
 * @swagger
 * /courts/{id}:
 *   put:
 *     summary: Met à jour un court existant
 *     tags: [Courts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du court à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nouveau nom du court
 *               status:
 *                 type: string
 *                 description: Nouveau statut du court
 *     responses:
 *       200:
 *         description: Court mis à jour avec succès
 *       404:
 *         description: Court non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.put('/:id', courtController.updateCourt);

module.exports = router;
