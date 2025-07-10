const Category = require('../models/Category');

const crearCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    const existe = await Category.findOne({ nombre });
    if (existe) {
      return res.status(400).json({ message: 'La categoría ya existe' });
    }

    const nueva = await Category.create({ nombre, descripcion });
    res.status(201).json(nueva);
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const listarCategorias = async (req, res) => {
  try {
    const categorias = await Category.find({ activa: true });
    res.json(categorias);
} catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Error desconocido';
    console.error('❌ Error al obtener categorías:', errMsg);
    res.status(500).json({ message: 'Error al obtener categorías', error: errMsg });
  }
};

module.exports = {
  crearCategoria,
  listarCategorias,
};
