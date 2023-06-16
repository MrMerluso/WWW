const mongoose = require ('mongoose')

const medicamentoSchema = new mongoose.Schema({
    Codigo: Number,
    Descripcion: String,
    Fabricante: String,
    Tipo: String,
    Componentes: String,
    Contenido: String,
    Cantidad: Number,
    Gramaje: Number
}) ;

module.exports = mongoose.model('stockmeds', medicamentoSchema);

