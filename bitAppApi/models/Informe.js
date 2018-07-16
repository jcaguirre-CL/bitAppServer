var mongoose = require('mongoose');
var InformeSchema = new mongoose.Schema({
  listadoEventos: [{_id: String}],
  responsable: String,
  fecha: { type: Date, default: Date.now },
  turno: String,
  informeId: String
}, { collection: 'Informe' });
module.exports = mongoose.model('Informe', InformeSchema);