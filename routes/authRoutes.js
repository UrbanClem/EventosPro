const express = require('express');
const router = express.Router();
const db = require('../config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Función para generar tokens JWT
const generarToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'tusecretoparaproyectoescolar', // Usa una cadena por defecto para desarrollo
    { expiresIn: '1h' } // El token expira en 1 hora
  );
};

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validación básica
  if (!email || !password) {
    return res.status(400).json({ 
      success: false,
      message: "Email y contraseña son requeridos" 
    });
  }

  try {
    const [users] = await db.promise().query(
      'SELECT id, username, email, admin FROM usuarios WHERE email = ? AND password = ?',
      [email, password]
    );

    if (users.length === 0) {
      return res.status(401).json({ 
        success: false,
        message: "Credenciales incorrectas" 
      });
    }

    const user = users[0];
    const token = generarToken(user.id);
    
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        admin: user.admin
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ 
      success: false,
      message: "Error en el servidor" 
    });
  }
});

module.exports = router;