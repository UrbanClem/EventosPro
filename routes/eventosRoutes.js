const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/eventos', async (req, res) => {
  const { nombre, description, categoria, fechayhora, sede, capacidad, precio } = req.body;

  // Validación básica (quitamos la validación de inscripcion)
  if (!nombre || !description || !categoria || !fechayhora || !sede || !capacidad) {
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

    // Insertar evento (precio será 0 si no se especifica)
    const [result] = await db.promise().query(
      'INSERT INTO eventos (nombre, description, categoria, fechayhora, sede, capacidad, precio) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, description, categoria, fechayhora, sede, capacidad, precio || 0]  // precio por defecto 0
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