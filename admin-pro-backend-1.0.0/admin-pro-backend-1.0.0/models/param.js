const { Schema, model } = require('mongoose');
const ParamSchema = Schema({
    Codigo: {
         type: String,
         required: true
     },
    Nombre: {
        type: String,
        required: true
    },
    Concepto: {
        type: String,
        required: false
    },
    Valor: {
        type: Number,
        required: false
    },
    Estado: {
        type: String,
        required: true
    },
    Descripcion: {
        type: String,
        required: false
    },
    // img: {
    //     type: String,
    // },
});


ParamSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'Param', ParamSchema );