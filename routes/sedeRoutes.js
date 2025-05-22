const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener todas las sedes (GET)
router.get('/sede', async (req, res) => {
  try {
    const [sedes] = await db.promise().query('SELECT id, nombre, capacidad FROM sede');
    res.json(sedes);
  } catch (error) {
    console.error('Error al obtener sedes:', error);
    res.status(500).json({ message: "Error al obtener sedes" });
  }
});

// Crear nueva sede (POST)
router.post('/sede', async (req, res) => {
  const { nombre, direccion, capacidad } = req.body;

  // Validación de campos requeridos
  if (!nombre || !direccion || !capacidad) {
    return res.status(400).json({ 
      message: "Todos los campos son requeridos (nombre, direccion, capacidad)" 
    });
  }

  try {
    // Insertar nueva sede en la base de datos
    const [result] = await db.promise().query(
      'INSERT INTO sede (nombre, direccion, capacidad) VALUES (?, ?, ?)',
      [nombre, direccion, capacidad]
    );

    // Respuesta exitosa
    res.status(201).json({
      success: true,
      message: "Sede creada exitosamente",
      sedeId: result.insertId,
      sede: {
        id: result.insertId,
        nombre,
        direccion,
        capacidad
      }
    });

  } catch (error) {
    console.error('Error al crear sede:', error);
    res.status(500).json({ 
      message: "Error al crear sede",
      error: error.message 
    });
  }
});

module.exports = router;