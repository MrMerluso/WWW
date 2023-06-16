const mongoose = require ('mongoose')


const salidaSchema = new mongoose.Schema( {
    Cantidad: Number,
    Nombre: String,
    Rut: String,
    Meds : {
        type: [mongoose.Schema.Types.ObjectID],
        ref: 'stockmeds'
    }
});

module.exports = mongoose.model('salida', salidaSchema);