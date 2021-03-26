const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

const app = express();

conectarDB();

// Habilitar CORS
app.use(cors());

app.use(express.json({ extended: true }))

const port = process.env.PORT || 8001;

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

app.listen(port, '0.0.0.0', () => {
    console.log(`Server activo en el puerto ${port}`);
});