const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, obtenerUsuarios } = require('../controllers/authController');
const verifyToken = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin')

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', verifyToken, getProfile);
router.get('/usuarios', verifyToken, isAdmin, obtenerUsuarios )

module.exports = router;
