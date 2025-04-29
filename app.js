const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors({
  origin: true, 
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

const authRoutes = require('./src/routes/authRoutes');
app.use('/api', authRoutes);
app.get('/', (req, res) => {
  res.send('Servidor de Distribuidora funcionando 🚀');
});

module.exports = app;
