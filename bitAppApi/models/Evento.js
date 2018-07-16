var mongoose = require('mongoose');
var EventoSchema = new mongoose.Schema({
  eventoId: String,
  informeId: String,
  responsableEvento: String,
  area: String,
  falla: String,
  plataforma: { nombre: String, falla: String},
  fecha: { type: Date, default: Date.now },
  hora: String,
  descripcion: String,
  solucion: String,
  estado: String,
  informante: String,
  responsabilidad: String
}, { collection: 'Evento' });
module.exports = mongoose.model('Evento', EventoSchema);