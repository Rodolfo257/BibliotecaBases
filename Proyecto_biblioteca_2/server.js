const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

// Configuración más estricta de CORS
app.use(cors({
    origin: 'http://127.0.0.1:8080', // Ajusta al puerto donde sirves tu HTML
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Configuración de PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Biblioteca',
    password: '1234',
    port: 5432,
});

// Mejor manejo de conexión a la base de datos
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error al conectar con PostgreSQL:', err.stack);
    }
    console.log('Conexión exitosa a PostgreSQL');
    release();
});

// Ruta de login mejorada
app.post('/login', async (req, res) => {
    const { usuario, contraseña } = req.body;

    if (!usuario || !contraseña) {
        return res.status(400).json({ 
            success: false, 
            message: "Usuario y contraseña son requeridos" 
        });
    }

    try {
        const query = 'SELECT * FROM public.usuario WHERE usuario = $1 AND "contraseña" = $2;';
        const result = await pool.query(query, [usuario, contraseña]);

        if (result.rows.length > 0) {
            res.json({ 
                success: true, 
                message: "Inicio de sesión válido",
                user: result.rows[0] // Opcional: devolver datos del usuario
            });
        } else {
            res.status(401).json({ 
                success: false, 
                message: "Credenciales incorrectas" 
            });
        }
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ 
            success: false, 
            error: "Error interno del servidor" 
        });
    }
});

app.listen(3000, () => {
    console.log('Servidor backend en http://127.0.0.1:3000');
});