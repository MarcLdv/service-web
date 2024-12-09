const express = require('express');
const router = express.Router();
const { createReservation, getUserReservations } = require('../controllers/reservationController');
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
 *         courtId:
 *           type: integer
 *           description: Identifiant du terrain réservé
 *         date:
 *           type: string
 *           format: date
 *           description: Date de la réservation
 *         timeSlot:
 *           type: string
 *           description: Créneau horaire de la réservation (par exemple "10:00-11:00")
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
 *         courtId: 1
 *         date: "2024-12-10"
 *         timeSlot: "10:00-11:00"
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
 *               - date
 *               - timeSlot
 *             properties:
 *               courtId:
 *                 type: integer
 *                 description: ID du terrain à réserver
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date de la réservation
 *               timeSlot:
 *                 type: integer
 *                 description: Créneau horaire de la réservation
 *             example:
 *               courtId: 1
 *               date: "2024-12-10"
 *               timeSlot: 10
 *     responses:
 *       201:
 *         description: Réservation créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID de la réservation
 *                 userId:
 *                   type: integer
 *                   description: ID de l'utilisateur ayant effectué la réservation
 *                 courtId:
 *                   type: integer
 *                   description: ID du terrain réservé
 *                 date:
 *                   type: string
 *                   format: date
 *                   description: Date de la réservation
 *                 timeSlot:
 *                   type: integer
 *                   description: Créneau horaire réservé
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *             example:
 *               id: 1
 *               userId: 42
 *               courtId: 1
 *               date: "2024-12-10"
 *               timeSlot: 10
 *               createdAt: "2024-12-07T12:00:00Z"
 *               updatedAt: "2024-12-07T12:00:00Z"
 *       400:
 *         description: Erreur de validation ou créneau déjà réservé
 *       401:
 *         description: Non autorisé (token manquant ou invalide)
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
 *                   courtId:
 *                     type: integer
 *                     description: ID du terrain réservé
 *                   date:
 *                     type: string
 *                     format: date
 *                     description: Date de la réservation
 *                   timeSlot:
 *                     type: integer
 *                     description: Créneau horaire réservé
 *                   Court:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID du terrain
 *                       name:
 *                         type: string
 *                         description: Nom du terrain
 *                       status:
 *                         type: string
 *                         description: Statut du terrain (available ou non)
 *                 example:
 *                   id: 1
 *                   courtId: 1
 *                   date: "2024-12-10"
 *                   timeSlot: 10
 *                   Court:
 *                     id: 1
 *                     name: "Court A"
 *                     status: "available"
 *       401:
 *         description: Non autorisé (token manquant ou invalide)
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/', authenticateUser, getUserReservations);

module.exports = router;
