var mongoose = require('mongoose');
var EventoSchema = new mongoose.Schema({
  eventoId: String,
  informeId: String,
  respevento: String,
  fecha: { type: Date, default: Date.now },
  hora: String,
  informante: String,
  area: String,
  programa: String,
  nivel: String,
  plataforma: { nombre: String, itemfalla: String},
  tipofalla: String,
  descripcion: String,
  solucion: String,
  respoperacion: String,
  estado: String,
  fechares: { type: Date, default: Date.now },
  atencion: String,
  impacto: String
}, { collection: 'Evento' });
module.exports = mongoose.model('Evento', EventoSchema);