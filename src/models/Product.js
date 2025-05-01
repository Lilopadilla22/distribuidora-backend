const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  precio_por_kilo: {
    type: Number,
    default: 0,
  },
  precio_por_unidad: {
    type: Number,
    default: 0,
  },
  unidad: {
    type: String,
    enum: ['kilo', 'unidad'],
    required: true,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
