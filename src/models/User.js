const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  direccion: { type: String },
  telefono: { type: String },
  fecha_cumpleanos: { type: Date },
  cc: { type: String },
  nombre_negocio: { type: String },
  role: { type: String, enum: ['client', 'admin'], default: 'client' },
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);

