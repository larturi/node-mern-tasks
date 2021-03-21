// Rutas para CRUD Tareas

const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Crear Tareas //
// api/tareas
router.post('/', 
    auth,
    [
        check('nombre', 'El nombre de la Tarea es obligatorio').not().isEmpty(),
        check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
);

// Obtener tareas de un proyecto
router.get('/', 
    auth,
    tareaController.getTareas
);

// Update Tarea
router.put('/:id', 
    auth,
    tareaController.updateTarea
);

// Delete Tarea
router.delete('/:id', 
    auth,
    tareaController.deleteTarea
);

module.exports = router;