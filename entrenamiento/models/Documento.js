var mongoose = require('mongoose');

let Documento = new mongoose.Schema({
    nombreDocumento:{
        type: String,
        required: true,
        unique: true
    },
    propietario: String,
});

module.exports = mongoose.model('documento',Documento);

