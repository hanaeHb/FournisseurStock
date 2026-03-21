const express = require("express");
const router = express.Router();
const controller = require("../controllers/fournisseurController");
const authMiddleware = require("../middleware/authMiddleware");
const hasRole = require("../middleware/hasRole");

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Fournisseurs
 *   description: Gestion des fournisseurs
 */

/**
 * @swagger
 * /api/fournisseurs:
 *   get:
 *     summary: Récupérer tous les fournisseurs
 *     tags: [Fournisseurs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des fournisseurs
 */
router.get("/fournisseurs", authMiddleware, controller.getAll);

/**
 * @swagger
 * /api/fournisseurs/{id}:
 *   get:
 *     summary: Récupérer un fournisseur par ID
 *     tags: [Fournisseurs]
 *     security:
 *       - bearerAuth: []
 */
router.get("/fournisseurs/:id", authMiddleware, controller.getById);

/**
 * @swagger
 * /api/fournisseurs:
 *   post:
 *     summary: Créer un nouveau fournisseur
 *     tags: [Fournisseurs]
 *     security:
 *       - bearerAuth: []
 */
router.post("/fournisseurs", authMiddleware, hasRole("ADMIN"), controller.create);

/**
 * @swagger
 * /api/fournisseurs/{id}:
 *   put:
 *     summary: Mettre à jour un fournisseur
 *     tags: [Fournisseurs]
 *     security:
 *       - bearerAuth: []
 */
router.put("/fournisseurs/:id", authMiddleware, hasRole("ADMIN"), controller.update);

/**
 * @swagger
 * /api/fournisseurs/{id}:
 *   delete:
 *     summary: Supprimer un fournisseur
 *     tags: [Fournisseurs]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/fournisseurs/:id", authMiddleware, hasRole("ADMIN"), controller.delete);

/**
 * @swagger
 * /api/fournisseurs/{id}/activer:
 *   put:
 *     summary: Activer un fournisseur
 *     tags: [Fournisseurs]
 *     security:
 *       - bearerAuth: []
 */
router.put("/fournisseurs/:id/activer", authMiddleware, hasRole("ADMIN"), controller.activer);

/**
 * @swagger
 * /api/fournisseurs/{id}/desactiver:
 *   put:
 *     summary: Désactiver un fournisseur
 *     tags: [Fournisseurs]
 *     security:
 *       - bearerAuth: []
 */
router.put("/fournisseurs/:id/desactiver", authMiddleware, hasRole("ADMIN"), controller.desactiver);

module.exports = router;