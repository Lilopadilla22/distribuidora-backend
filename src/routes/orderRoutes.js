const express = require('express');
const router = express.Router();
const { 
    crearPedido, 
    listarPedidos, 
    cancelarPedido, 
    actualizarPedido, 
    listarTodasLasOrdenes, 
    actualizarEstadoPedido 
} = require('../controllers/orderController');

const verifyToken = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

router.post('/', verifyToken, crearPedido);
router.get('/', verifyToken, listarPedidos);
router.put('/:id', verifyToken, cancelarPedido);
router.put('/:id/editar', verifyToken, actualizarPedido);
router.get('/todos', verifyToken, isAdmin, listarTodasLasOrdenes);
router.patch('/:id/estado', verifyToken, isAdmin, actualizarEstadoPedido);  


module.exports = router;
