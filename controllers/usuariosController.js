const User = require('../models/Usuarios.js');

// Obtener todos los usuarios
exports.getAllUsers = (req, res) => {
  User.getAllUsers((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Agregar un nuevo usuario
exports.addUser = (req, res) => {
  const newUser = req.body;
  User.addUser(newUser, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Usuario agregado', id: result.insertId });
  });
};

// Modificar usuario
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  Estudiante.updateUser(id, updatedData, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Usuario actualizado' });
  });
};

// Eliminar usuario
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  User.deleteUser(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Usuario eliminado' });
  });
};