const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/eventos', async (req, res) => {
  const { nombre, descripcion, categoria, fechayhora, sede, capacidad, precio } = req.body;

  // Validación básica
  if (!nombre || !descripcion || !categoria || !fechayhora || !sede || !capacidad) {
    return res.status(400).json({ message: "Faltan campos requeridos" });
  }

  try {
    // Verificar capacidad de la sede
    const [sedeData] = await db.promise().query(
      'SELECT capacidad FROM sede WHERE id = ?', 
      [sede]
    );

    if (sedeData.length === 0) {
      return res.status(400).json({ message: "La sede seleccionada no existe" });
    }

    const capacidadSede = sedeData[0].capacidad;

    if (parseInt(capacidad) > capacidadSede) {
      return res.status(400).json({ 
        message: `La capacidad excede el máximo permitido (${capacidadSede})`,
        capacidadMaxima: capacidadSede
      });
    }

    // Insertar evento
    const [result] = await db.promise().query(
      'INSERT INTO eventos (nombre, descripcion, categoria, fechayhora, sede, capacidad, precio) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, descripcion, categoria, fechayhora, sede, capacidad, precio || 0]
    );

    res.status(201).json({
      success: true,
      message: "Evento creado exitosamente",
      eventoId: result.insertId
    });

  } catch (error) {
    console.error('Error en POST /api/eventos:', error);
    res.status(500).json({ 
      message: "Error interno al crear el evento",
      error: error.message
    });
  }
});

router.get('/eventos', async (req, res) => {
  try {
    const { tipo, fecha, ubicacion } = req.query;
    let query = `
      SELECT 
        e.id,
        e.nombre,
        e.descripcion,
        e.categoria AS tipo,
        e.fechayhora,
        s.direccion,
        e.capacidad,
        CASE 
          WHEN e.precio = 0 THEN 'Gratis'
          ELSE CONCAT('$', e.precio)
        END AS inscripcion,
        e.precio
      FROM eventos e
      JOIN sede s ON e.sede = s.id
      WHERE 1=1
    `;
    
    const params = [];
    
    if (tipo) {
      query += ' AND e.categoria = ?';
      params.push(tipo);
    }
    
    if (fecha) {
      query += ' AND DATE(e.fechayhora) = ?';
      params.push(fecha);
    }
    
    if (ubicacion) {
      query += ' AND s.direccion LIKE ?';
      params.push(`%${ubicacion}%`);
    }
    
    query += ' ORDER BY e.fechayhora ASC';
    
    const [eventos] = await db.promise().query(query, params);
    res.json(eventos);
    
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    res.status(500).json({ message: "Error al obtener eventos" });
  }
});

module.exports = router;