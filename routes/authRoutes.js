const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Tu conexión actual con mysql2

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  try {
    // Consulta usando mysql2 (con promesas)
    const [rows] = await db.promise().query(
      'SELECT * FROM usuarios WHERE email = ?', 
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const usuario = rows[0];
    if (usuario.password !== password) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    res.json({ 
      success: true, 
      message: "Inicio de sesión exitoso",
      admin: usuario.admin // Añade esto si necesitas el tipo de usuario
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;