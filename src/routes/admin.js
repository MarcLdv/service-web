const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Gestion de l'admin
 */

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Se connecter en tant qu'admin
 *     tags: [Admin]
 *     requestBody:
*       content:
 *         application/json:
*           schema:
*             type: object
*             properties:
*               pseudo:
*                 type: string
*                 default: 'pseudo'
*               password:
*                 type: string
*                 default: 'password'
*             required:
*               - pseudo
*               - password
 *     responses:
 *       201:
 *         description: Authentification réussie.
 *       400:
 *         description: Impossible de vous authentifier.
 */
router.post('/login', adminController.login); // Correction de la route

module.exports = router;
