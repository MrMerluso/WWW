const mongoose = require ('mongoose');
const stockmeds = require('./stockmeds');

const entradaSchema = new mongoose.Schema( {
    Medicamento: {type: mongoose.Schema.Types.ObjectId, ref: 'stockmeds'},
    Cantidad: Number
});

module.exports = mongoose.model('entrada', entradaSchema);