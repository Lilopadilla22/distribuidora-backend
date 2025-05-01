const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productos: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      cantidad: {
        type: Number,
        required: true,
      },
      unidad: {
        type: String,
        enum: ['kilo', 'unidad'],
        required: true,
      }
    }
  ],
  total: {
    type: Number,
    required: true,
  },
  estado: {
    type: String,
    enum: ['pendiente', 'cancelado', 'entregado'],
    default: 'pendiente',
  },
  hora_limite: {
    type: Date, 
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
