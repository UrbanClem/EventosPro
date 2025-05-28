const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/organizadores', async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT id, username, email FROM usuarios WHERE admin = 1');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener organizadores:', error);
    res.status(500).json({ message: 'Error al obtener organizadores' });
  }
});

router.put('/organizador/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    await db.promise().query('UPDATE usuarios SET admin = 0 WHERE id = ?', [userId]);
    res.json({ success: true, message: 'Organizador eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar organizador:', error);
    res.status(500).json({ message: 'Error al eliminar organizador' });
  }
});


module.exports = router;