const mongoose = require ('mongoose')

const recetaSchema = new mongoose.Schema( {
    Nombre: String,
    Edad: Number,
    Rut: Number,
    Medicamento: {
        type: [mongoose.Schema.Types.ObjectID],
        ref: 'stockmeds'
    },
    Cantidad: Number,
    Observaciones: String

});

module.exports = mongoose.model('receta', recetaSchema);