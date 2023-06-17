const mongoose = require ('mongoose');
const stockmeds = require('./stockmeds');

const recetaSchema = new mongoose.Schema( {
    Nombre: String,
    Edad: Number,
    Rut: String,
    Medicamento: {type: mongoose.Schema.Types.ObjectId, ref: 'stockmeds'},
    Cantidad: Number,
    Observaciones: String

});

module.exports = mongoose.model('receta', recetaSchema);