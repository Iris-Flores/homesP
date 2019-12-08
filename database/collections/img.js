const mongooseImg = require('../connect');
const Schema = mongooseImg.Schema;

const imagenSchema = Schema({
    name : String,
    idUsuario: String,
    path : String,

    fechaRegistro: {
        type: Date,
        default: Date.now()
    }
});

const imagen = mongooseImg.model('Imagen', imagenSchema);

module.exports = imagen;
