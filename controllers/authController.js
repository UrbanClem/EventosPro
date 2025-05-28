const db = require('../config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Login de usuario
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validaciones básicas
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      error: 'Email y contraseña son requeridos' 
    });
  }

  try {
    // 1. Buscar usuario por email
    const query = 'SELECT * FROM usuarios WHERE email = ? LIMIT 1';
    const [user] = await db.query(query, [email]);

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Credenciales incorrectas' 
      });
    }

    // 2. Verificar contraseña 
    if (user.password !== password) {
      return res.status(401).json({ 
        success: false, 
        error: 'Credenciales incorrectas' 
      });
    }

    // 3. Generar token JWT (simplificado)
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        admin: user.admin
      },
      process.env.JWT_SECRET || 'secretodeescuela', // Usa valor por defecto para desarrollo
      { expiresIn: '1h' }
    );

    // 4. Responder con los datos necesarios
    res.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        admin: user.admin
      }
    });

  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Error en el servidor' 
    });
  }
};