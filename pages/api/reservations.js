const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const pool = new Pool({
  connectionString: 'postgres://mmsqxbxg:HZYvCd7KAvBkb9ZNswioa_Pg5ajJ4-Nq@silly.db.elephantsql.com:5432/mmsqxbxg',
});


// Crear una nueva reserva
app.post('/api/reservas', async (req, res) => {
  try {
    const { servicio_id, fecha_reserva, correo, cantidad_personas } = req.body;
    
    // Ajustar el formato de la fecha
    const fechaReserva = new Date(fecha_reserva).toISOString().split('T')[0];
    console.log(fechaReserva);
    const query = 'INSERT INTO reservas (servicio_id, fecha_reserva, correo, cantidad_personas) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [servicio_id, fechaReserva, correo, cantidad_personas];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la reserva' });
  }
});


// Obtener todas las reservas para una fecha específica
app.get('/api/reservas/:fecha', async (req, res) => {
  const { fecha } = req.params;
  try {
    const query = 'SELECT * FROM reservas WHERE fecha_reserva = $1';
    const result = await pool.query(query, [fecha]);
    res.json(result.rows);
    console.log(fecha + " se esta buscando");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las reservas' });
  }
});


// Obtener todos los servicios
app.get('/api/servicios', async (req, res) => {
  try {
    const query = 'SELECT * FROM servicios';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los servicios' });
  }
});

// Obtener un servicio por su ID
app.get('/api/servicios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'SELECT * FROM servicios WHERE id = $1';
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ message: 'Servicio no encontrado' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el servicio' });
  }
});

// Obtener las fechas bloqueadas
app.get('/api/blocked-dates', async (req, res) => {
  try {
    const query = `
      SELECT fecha_reserva
      FROM (
          SELECT r.fecha_reserva, SUM(r.cantidad_personas) AS total_personas, s.cupos_maximos
          FROM reservas r
          JOIN servicios s ON r.servicio_id = s.id
          WHERE r.fecha_reserva >= CURRENT_DATE -- Filtrar las fechas a partir de hoy
          GROUP BY r.fecha_reserva, s.cupos_maximos
      ) subquery
      WHERE total_personas >= cupos_maximos;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las fechas bloqueadas' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend en ejecución en el puerto ${PORT}`);
});