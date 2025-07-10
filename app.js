const corn = require('./src/utils/serverHelpsCheck.js')
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

const categoryRoutes = require('./src/routes/categoryRoutes');
app.use('/api/categorias', categoryRoutes);

const productRoutes = require('./src/routes/productRoutes');
app.use('/api/productos', productRoutes);

const orderRoutes = require('./src/routes/orderRoutes');
app.use('/api/pedidos', orderRoutes);



module.exports = app;
