
const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController.js');


// Ruta para obtener todos los usuarios
router.get('/usuarios', usuariosController.getAllUsers);

// Ruta para agregar un nuevo usuario
router.post('/usuarios', usuariosController.addUser);

// Ruta para modificar un usuario existente
router.put('/actualizar/:id', usuariosController.updateUser);

// Ruta para eliminar un estudiante
router.delete('/borrar/:id', usuariosController.deleteUser);


module.exports = router;