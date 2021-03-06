const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { email, password } = req.body;
    
    try {

        let usuario = await Usuario.findOne({email})

        if (usuario) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email ingresado'
            });
        }

        usuario = new Usuario(req.body);

        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        await usuario.save();

        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;

            res.status(201).json({
                token
            });

        });

    } catch (error) {
        console.error(error);
        res.status(400).send('Error al insertar nuevo usuario');
    }

};