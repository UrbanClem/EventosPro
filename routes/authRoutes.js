const express = require('express');
const router = express.Router();
// const db = require('../db'); // o como sea tu acceso a la BD

router.post('/login', async (req, res) => {
  const { email, passwordgit } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  try {
    // Busca el usuario por email
    const usuario = await db('usuarios').where({ email }).first();
    if (!usuario) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Compara la contraseña (¡en producción debe estar hasheada!)
    if (usuario.password !== password) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Si todo ok, devuelve éxito (y un token si quieres)
    res.json({ success: true, message: "Inicio de sesión exitoso" /* , token: ... */ });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;