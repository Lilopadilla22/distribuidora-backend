const Product = require('../models/Product');
const Category = require('../models/Category');

const crearProducto = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      categoria, 
      precio_por_kilo,
      precio_por_unidad,
      unidad,
      disponible
    } = req.body;

    const categoriaExiste = await Category.findById(categoria);
    if (!categoriaExiste) {
      return res.status(400).json({ message: 'Categoría no válida' });
    }

    const nuevoProducto = await Product.create({
      nombre,
      descripcion,
      categoria,
      precio_por_kilo,
      precio_por_unidad,
      unidad,
      disponible
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Error desconocido';
    console.error('❌ Error al crear producto:', errMsg);
    res.status(500).json({ message: 'Error al crear producto', error: errMsg });
  }
};

const listarProductos = async (req, res) => {
  try {
    const { categoria, disponible } = req.query;

    const filtro = {};

    if (categoria) {
      filtro.categoria = categoria;
    }

    if (disponible) {
      filtro.disponible = disponible === 'true';
    }

    const productos = await Product.find(filtro).populate('categoria', 'nombre');
    res.json(productos);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Error desconocido';
    console.error('❌ Error al listar productos:', errMsg);
    res.status(500).json({ message: 'Error al listar productos', error: errMsg });
  }
};

const cambiarDisponibilidad = async (req, res) => {
  try {
    const { id } = req.params;
    const { disponible } = req.body;

    if (typeof disponible !== 'boolean') {
      return res.status(400).json({ message: 'El campo "disponible" debe ser true o false' });
    }

    const producto = await Product.findById(id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    producto.disponible = disponible;
    await producto.save();

    res.json({ message: `Producto ${disponible ? 'activado' : 'desactivado'} correctamente`, producto });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Error desconocido';
    console.error('❌ Error al cambiar disponibilidad:', errMsg);
    res.status(500).json({ message: 'Error al cambiar disponibilidad', error: errMsg });
  }
};

const obtenerRecomendados = async (req, res) => {
  try {
    const productos = await Product.find({ recomendado: true, disponible: true }).populate('categoria', 'nombre');
    res.json(productos);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Error desconocido';
    console.error('❌ Error al obtener recomendados:', errMsg);
    res.status(500).json({ message: 'error en recomendados', error: errMsg });
  }
};




module.exports = {
  crearProducto,
  listarProductos,
  cambiarDisponibilidad,
  obtenerRecomendados
};
