const mysql = require('mysql');

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost', // Replace with your database host
  user: 'root', // Replace with your database username
  password: '', // Replace with your database password
  database: 'eventospro' // Replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
  console.log('Connected to the MySQL database.');
});

module.exports = db;