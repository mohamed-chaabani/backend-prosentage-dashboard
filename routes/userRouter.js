
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route pour enregistrer un utilisateur
router.post('/register', userController.register);

// Route pour se connecter (login) un utilisateur
router.post('/login', userController.login);

// Route pour vérifier l'email d'un utilisateur
router.get('/verify-email', userController.verifyEmail);

// Route protégée
router.get('/getuserbyid/:id', authMiddleware, userController.GetUserByIds);

module.exports = router;
