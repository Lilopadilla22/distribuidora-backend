const express = require('express');
const router = express.Router();
const { crearCategoria, listarCategorias } = require('../controllers/categoryController');

router.post('/', crearCategoria);
router.get('/', listarCategorias);

module.exports = router;
