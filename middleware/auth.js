const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }

  try {
    // Verificar token (implementa tu lógica de verificación)
    const userData = verificarToken(token); // Implementa esta función
    req.user = userData;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = authMiddleware;