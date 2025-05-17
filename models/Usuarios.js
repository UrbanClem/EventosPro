const db = require('../config/db');
/*  Pueden usarlo así, pero no es necesario y exportar los métodos con exports 
//module .exports = Estudiante;
const Estudiante = {
  getAll: (callback) => {
    const query = 'SELECT * FROM estudiantes';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  }
};
*/

// Obtener todos los usuarios
exports.getAllUsers = (callback) => {
  const query = 'SELECT * FROM usuarios';
  db.query(query, callback);
};

// Agregar un nuevo usuario
exports.addUser = (userData, callback) => {
  const query = 'INSERT INTO usuarios (username, email, password, admin) VALUES (?, ?, ?, ?)';
  db.query(query, [userData.username, userData.email, userData.password, userData.admin], callback);
};

// Modificar un usuario existente
exports.updateStudent = (id, userData, callback) => {
  const query = 'UPDATE usuarios SET username = ?, email = ?, password = ? WHERE id = ?';
  db.query(query, [userData.username, userData.email, userData.password, id], callback);
};


// Eliminar un usuario
exports.deleteStudent = (id, callback) => {
  const query = 'DELETE FROM usuarios WHERE id= ?';
  db.query(query, [id], callback);
};

/*module.exports = Estudiante;*/