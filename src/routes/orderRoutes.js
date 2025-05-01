const express = require('express');
const router = express.Router();
const { crearPedido, listarPedidos, cancelarPedido, actualizarPedido } = require('../controllers/orderController');

const verifyToken = require('../middlewares/authMiddleware');

router.post('/', verifyToken, crearPedido);
router.get('/', verifyToken, listarPedidos);
router.put('/:id', verifyToken, cancelarPedido);
router.put('/:id/editar', verifyToken, actualizarPedido);




module.exports = router;
