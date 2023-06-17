const mongoose = require ('mongoose');
const stockmeds = require('./stockmeds');


const salidaSchema = new mongoose.Schema( {
    Medicamento: {type: mongoose.Schema.Types.ObjectId, ref: 'stockmeds'},
    Cantidad: Number,
    Nombre: String,
    Rut: String
});

module.exports = mongoose.model('salida', salidaSchema);