const express = require('express');
const router = express.Router();
const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem
} = require('../controllers/itemController');

router.post('/items', createItem); // Crear
router.get('/items', getItems); // Leer todos
router.get('/items/:id', getItemById); // Leer por ID
router.put('/items/:id', updateItem); // Actualizar
router.delete('/items/:id', deleteItem); // Eliminar

module.exports = router;