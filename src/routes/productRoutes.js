const express = require('express');
const router = express.Router();
const {
  crearProducto,
  listarProductos,
  cambiarDisponibilidad,
  obtenerRecomendados
} = require('../controllers/productController');

router.post('/', crearProducto);

router.get('/', listarProductos);

router.put('/:id/estado', cambiarDisponibilidad); 

router.get('/recomendados', obtenerRecomendados);


module.exports = router;
