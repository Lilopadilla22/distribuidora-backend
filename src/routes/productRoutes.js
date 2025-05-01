const express = require('express');
const router = express.Router();
const {
  crearProducto,
  listarProductos,
  cambiarDisponibilidad
} = require('../controllers/productController');

router.post('/', crearProducto);

router.get('/', listarProductos);

router.put('/:id/estado', cambiarDisponibilidad); 


module.exports = router;
