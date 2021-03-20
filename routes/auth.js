// Rutas para autenticar usuarios

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

// Autenticar Usuario //
// api/auth
router.post('/', 
    [
        check('email', 'Ingresa un email valido').isEmail(),
        check('password', 'El password debe tener por lo menos 6 caracteres').isLength({ min: 6 })
    ],
    authController.autenticarUsuario
);

module.exports = router;