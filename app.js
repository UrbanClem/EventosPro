const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Importación de rutas
const usuariosRoutes = require('./routes/usuariosRoutes');
const authRoutes = require('./routes/authRoutes');
const sedeRoutes = require('./routes/sedeRoutes');
const eventosRoutes = require('./routes/eventosRoutes');
const testRoutes = require('./routes/testRoutes');

// Rutas
app.use('/prueba', (req, res) => {
   res.send('Ruta de prueba');
});

app.use('/api', [
  usuariosRoutes,
  authRoutes,
  sedeRoutes,
  eventosRoutes
]);

app.use('/test', testRoutes);

// Manejo de 404
app.use((req, res) => {
  res.status(404).send('<h1>Error 404</h1><p>La ruta que intentas acceder no existe.</p>');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});