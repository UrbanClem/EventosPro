const mysql = require('mysql2');
const conexion= mysql.createConnection({
  host: 'localhost',   
  user: 'miusuario', // Cambia esto por tu usuario de MySQL
  password: 'miclave', // Cambia esto por tu contraseña de MySQL
  database: 'test', // Cambia esto por el nombre de tu base de datos
  port: 3306   //revisar el puerto, por defecto es 3306
});

// Probar la conexión


conexion.connect((err) => {
  if (err) {
    console.error('Error de conexión a MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL.');
});

module.exports = conexion