const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET eventos-usuarios (lista general, no necesaria si usas solo las específicas)
router.get('/eventos-usuarios', (req, res) => {
  db.query('SELECT * FROM eventos_usuarios', (err, results) => {
    if (err) {
      console.error('❌ ERROR al obtener inscripciones:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
    res.json(results);
  });
});

// POST para inscribirse en evento
router.post('/eventos-usuarios', (req, res) => {
  const { id_usuario, id_evento } = req.body;

  if (!id_usuario || !id_evento) {
    return res.status(400).json({ message: 'Faltan id_usuario o id_evento' });
  }

  db.query(
    'SELECT * FROM eventos_usuarios WHERE id_usuario = ? AND id_evento = ?',
    [id_usuario, id_evento],
    (err, results) => {
      if (err) {
        console.error('❌ ERROR al verificar inscripción:', err);
        return res.status(500).json({ message: 'Error interno del servidor' });
      }

      if (results.length > 0) {
        return res.status(409).json({ message: 'Ya estás inscrito en este evento' });
      }

      db.query(
        'INSERT INTO eventos_usuarios (id_usuario, id_evento) VALUES (?, ?)',
        [id_usuario, id_evento],
        (err) => {
          if (err) {
            console.error('❌ ERROR al registrar inscripción:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
          }

          res.status(201).json({ message: 'Inscripción exitosa' });
        }
      );
    }
  );
});

// DELETE para desinscribirse de un evento
router.delete('/eventos-usuarios', (req, res) => {
  const { id_usuario, id_evento } = req.body;

  if (!id_usuario || !id_evento) {
    return res.status(400).json({ message: 'Faltan id_usuario o id_evento' });
  }

  db.query(
    'DELETE FROM eventos_usuarios WHERE id_usuario = ? AND id_evento = ?',
    [id_usuario, id_evento],
    (err, result) => {
      if (err) {
        console.error('❌ ERROR al eliminar inscripción:', err);
        return res.status(500).json({ message: 'Error interno del servidor' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'No se encontró la inscripción para eliminar' });
      }

      res.json({ message: 'Inscripción eliminada correctamente' });
    }
  );
});


module.exports = router;