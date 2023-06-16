const mongoose = require ('mongoose');


const prescripcionSchema = new mongoose.Schema( {
    Nombre: String, 
    Edad: Number,
    Fecha: Date,
    Direccion: String,
    Medicamento: {type: mongoose.Schema.Types.ObjectId, ref: 'stockmeds'},
    Cantidad: Number, 
    Detalle: String
    
});

module.exports = mongoose.model('prescripcion', prescripcionSchema);