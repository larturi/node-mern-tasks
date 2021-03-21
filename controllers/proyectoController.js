const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

// Crear un Proyecto
exports.crearProyecto = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    try {
        const proyecto = new Proyecto(req.body);
        proyecto.creador = req.usuario.id;
        proyecto.save();
        res.status(201).json(proyecto);
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear proyecto');
    }

};

// Obtiene los Proyectos del Usuario
exports.getProyectos = async (req, res) => {

    try {
        const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({ creado: -1 });

        res.status(201).json(proyectos);
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener proyectos');
    }

};

// Actualizar un Proyeto
exports.updateProyecto = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { nombre } = req.body;
    const nuevoProyecto = {};

    if (nombre) {
        nuevoProyecto.nombre = nombre;
    }

    try {

        let proyecto = await Proyecto.findById(req.params.id);

        if (!proyecto) {
            res.status(404).send('Proyeto no encontrado');
        }

        if (proyecto.creador.toString() !== req.usuario.id) {
            res.status(401).send('No autorizado para updetear el proyecto');
        }

        proyecto = await Proyecto.findOneAndUpdate({ _id: req.params.id }, { $set: nuevoProyecto }, { new: true });

        res.status(202).json(proyecto);
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar proyecto');
    }

};

// Eliminar un Proyeto
exports.deleteProyecto = async (req, res) => {

    try {

        let proyecto = await Proyecto.findById(req.params.id);

        if (!proyecto) {
            res.status(404).send('Proyeto no encontrado');
        }

        if (proyecto.creador.toString() !== req.usuario.id) {
            res.status(401).send('No autorizado para eliminar el proyecto');
        }

        proyecto = await Proyecto.findOneAndRemove({ _id: req.params.id });

        res.status(200).json({ msg: 'Proyecto eliminado', proyecto });
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar proyecto');
    }

};