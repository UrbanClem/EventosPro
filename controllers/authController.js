const db = require('../config/db');

// Login de usuario
exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  // Busca usuario por email
  const query = 'SELECT * FROM usuarios WHERE email = ? AND password = ? LIMIT 1';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error en el servidor' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    // Si encuentra el usuario
    return res.json({ message: 'Inicio de sesión exitoso' });
  });
};