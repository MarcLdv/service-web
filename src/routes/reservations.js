const express = require('express');
const router = express.Router();
const { createReservation, getUserReservations, deleteReservation } = require('../controllers/reservationController');
const authenticateUser = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Gestion des réservations de terrains
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Reservation:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Identifiant unique de la réservation
 *         userId:
 *           type: integer
 *           description: Identifiant de l'utilisateur ayant effectué la réservation
 *         slotId:
 *           type: integer
 *           description: Identifiant du créneau horaire réservé
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création de la réservation
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de dernière mise à jour de la réservation
 *       example:
 *         id: 1
 *         userId: 2
 *         slotId: 1
 *         createdAt: "2024-12-01T12:00:00Z"
 *         updatedAt: "2024-12-01T12:00:00Z"
 */

/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Créer une nouvelle réservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courtId
 *               - slotId
 *             properties:
 *               courtId:
 *                 type: integer
 *                 description: Identifiant du terrain à réserver
 *               slotId:
 *                 type: integer
 *                 description: Identifiant du créneau horaire à réserver
 *             example:
 *               courtId: 1
 *               slotId: 1
 *     responses:
 *       201:
 *         description: Réservation créée avec succès
 *       400:
 *         description: Erreur de validation (créneau horaire non disponible)
 *       404:
 *         description: Créneau horaire non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/', authenticateUser, createReservation);

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Récupérer les réservations de l'utilisateur connecté
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des réservations de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la réservation
 *                   courtName:
 *                     type: string
 *                     description: Nom du terrain réservé
 *                   slotName:
 *                     type: string
 *                     description: Nom du créneau horaire réservé
 *                   schedule:
 *                     type: string
 *                     format: date-time
 *                     description: Date et heure du créneau horaire réservé
 *                 example:
 *                   id: 1
 *                   courtName: "Court A"
 *                   slotName: "Slot 1"
 *                   schedule: "2024-12-10T10:00:00Z"
 *       401:
 *         description: Non autorisé (token manquant ou invalide)
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/', authenticateUser, getUserReservations);

/**
 * @swagger
 * /reservations/{reservationId}:
 *   delete:
 *     summary: Supprimer une réservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reservationId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la réservation à supprimer
 *     responses:
 *       200:
 *         description: Réservation supprimée avec succès
 *       403:
 *         description: Non autorisé
 *       404:
 *         description: Réservation non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
router.delete('/:reservationId', authenticateUser, deleteReservation);

module.exports = router;
