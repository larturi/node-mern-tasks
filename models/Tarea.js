const mongoose = require('mongoose');

const TareaSchema = mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        trim: true
    },
    completa: {
        type: Boolean,
        default: false
    },
    creado: {
        type: Date,
        default: Date.now()
    },
    proyecto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto'
    }

});

module.exports = mongoose.model('TareaSchema', TareaSchema);