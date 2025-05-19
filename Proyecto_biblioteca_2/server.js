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


// Ruta para registrar un nuevo alumno
app.post('/alumnos', async (req, res) => {
    const { codigo, nombre, carrera, correo_electronico } = req.body;

    if (!codigo || !nombre) {
        return res.status(400).json({ success: false, message: "Código y nombre son requeridos" });
    }

    try {
        const query = 'INSERT INTO alumno (codigo, nombre, carrera, correo_electronico) VALUES ($1, $2, $3, $4)';
        await pool.query(query, [codigo, nombre, carrera, correo_electronico]);

        res.json({ success: true, message: "Alumno registrado con éxito" });
    } catch (err) {
        console.error('Error al insertar alumno:', err);
        res.status(500).json({ success: false, message: "Error al registrar alumno" });
    }
});


// Ruta para consultar todos los alumnos
app.get('/alumnos', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM public.alumno ORDER BY codigo');
        res.json({ success: true, alumnos: resultado.rows });
    } catch (err) {
        console.error('Error al consultar alumnos:', err);
        res.status(500).json({ success: false, message: "Error al obtener alumnos" });
    }
});

// Ruta para registrar un nuevo alumno
app.post('/profesor', async (req, res) => {
    const { codigoProfe, nombreProfe, carreraProfe, mailProfesor,contratacionFecha, antiguedadProfe} = req.body;

    try {
        const query = 'INSERT INTO profesor (codigo, nombre, carrera, correo_electronico, fecha_contratacion, antiguedad) VALUES ($1, $2, $3, $4, $5, $6)';
        await pool.query(query, [codigoProfe, nombreProfe, carreraProfe, mailProfesor,contratacionFecha, antiguedadProfe]);

        res.json({ success: true, message: "Profesor registrado con éxito" });
    } catch (err) {
        console.error('Error al insertar alumno:', err);
        res.status(500).json({ success: false, message: "Error al registrar profesor" });
    }
});

// Ruta para consultar todos los alumnos
// Ruta para consultar todos los profesores
app.get('/profesores', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM profesor ORDER BY codigo');

        // Convertir la fecha_contratacion a formato YYYY-MM-DD
        const profesoresFormateados = resultado.rows.map(profesor => ({
            ...profesor,
            fecha_contratacion: profesor.fecha_contratacion.toISOString().split('T')[0]
        }));

        res.json({ success: true, profesores: profesoresFormateados });
    } catch (err) {
        console.error('Error al consultar profesores:', err);
        res.status(500).json({ success: false, message: "Error al obtener profesores" });
    }
});



app.listen(3000, () => {
    console.log('Servidor backend en http://127.0.0.1:3000');
});
