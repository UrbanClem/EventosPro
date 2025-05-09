const db = require('../db');

// Crear objetos
exports.createItem = (req, res) => {
  const { name, description } = req.body;
  const sql = 'INSERT INTO items (name, description) VALUES (?, ?)';
  db.query(sql, [name, description], (err, result) => {
    if (err) {
      console.error('Error creating item:', err);
      res.status(500).send('Error creating item');
    } else {
      res.status(201).send({ id: result.insertId, name, description });
    }
  });
};

// Obtener todos los objetos
exports.getItems = (req, res) => {
  const sql = 'SELECT * FROM items';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching items:', err);
      res.status(500).send('Error fetching items');
    } else {
      res.status(200).send(results);
    }
  });
};

// Obtener un objeto por ID
exports.getItemById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM items WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching item:', err);
      res.status(500).send('Error fetching item');
    } else if (results.length === 0) {
      res.status(404).send('Item not found');
    } else {
      res.status(200).send(results[0]);
    }
  });
};

// Actualizar un objeto
exports.updateItem = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const sql = 'UPDATE items SET name = ?, description = ? WHERE id = ?';
  db.query(sql, [name, description, id], (err, result) => {
    if (err) {
      console.error('Error updating item:', err);
      res.status(500).send('Error updating item');
    } else if (result.affectedRows === 0) {
      res.status(404).send('Item not found');
    } else {
      res.status(200).send('Item updated successfully');
    }
  });
};

// Eliminar un objeto
exports.deleteItem = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM items WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting item:', err);
      res.status(500).send('Error deleting item');
    } else if (result.affectedRows === 0) {
      res.status(404).send('Item not found');
    } else {
      res.status(200).send('Item deleted successfully');
    }
  });
};