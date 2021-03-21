// Rutas para CRUD Proyectos

const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Crear Proyecto //

// api/proyectos
router.post('/', 
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
);

// Get Proyectos
router.get('/', 
    auth,
    proyectoController.getProyectos
);

// Update Proyecto
router.put('/:id', 
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.updateProyecto
);

// Delete Proyecto
router.delete('/:id', 
    auth,
    proyectoController.deleteProyecto
);

module.exports = router;