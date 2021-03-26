const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

// Crear una Tarea
exports.crearTarea = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    
    try {
        
        const { proyecto } = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);
        
        if (!existeProyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        if (existeProyecto.creador.toString() !== req.usuario.id) {
            res.status(401).send('No autorizado');
        }

        const tarea = new Tarea(req.body);
        await tarea.save();
        return res.status(201).json(tarea);

        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear tarea');
    }

};

// Obtiene las Tareas del Proyecto
exports.getTareas = async (req, res) => {

    try {

        const { proyecto } = req.query;
        const existeProyecto = await Proyecto.findById(proyecto);
        
        if (!existeProyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        if (existeProyecto.creador.toString() !== req.usuario.id) {
            res.status(401).send('No autorizado');
        }

        // Tareas por proyecto
        const tareas = await Tarea.find({ proyecto }).sort({ creado: -1 });

        res.status(201).json(tareas);
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener tareas');
    }

};

// Actualizar una Tarea
exports.updateTarea = async (req, res) => {

    try {

        const { proyecto, nombre, completa } = req.body;

        let tarea = await Tarea.findById(req.params.id);

        if (!tarea) {
            return res.status(404).json({ msg: 'Tarea no encontrada' });
        }

        const existeProyecto = await Proyecto.findById(proyecto);

        if (!existeProyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        if (existeProyecto.creador.toString() !== req.usuario.id) {
            res.status(401).send('No autorizado');
        }

        // Crear objeto con la nueva informacion de la tarea
        const nuevaTarea = {};

        nuevaTarea.nombre = nombre;
        nuevaTarea.completa = completa;

        tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, { $set: nuevaTarea }, { new: true });

        res.status(202).json(tarea);
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar tarea');
    }

};

// Eliminar una tarea
exports.deleteTarea = async (req, res) => {

    try {

        const { proyecto } = req.query;

        let tarea = await Tarea.findById(req.params.id);

        if (!tarea) {
            return res.status(404).json({ msg: 'Tarea no encontrada' });
        }

        const existeProyecto = await Proyecto.findById(proyecto);

        if (!existeProyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        if (existeProyecto.creador.toString() !== req.usuario.id) {
            res.status(401).send('No autorizado');
        }

        // Eliminar tarea
        const tareaDeleted = await Tarea.findOneAndRemove({ _id: req.params.id });
        res.status(202).json({ msg: 'Tarea eliminada',  tareaDeleted});
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar tarea');
    }

};