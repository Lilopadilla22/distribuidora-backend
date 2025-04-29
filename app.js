const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Rutas (por ahora ninguna)
app.get('/', (req, res) => {
  res.send('Servidor de Distribuidora funcionando 🚀');
});

module.exports = app;
