
const { Schema, model } = require('mongoose');

const MensajeSchema = Schema({
    de: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    para: {
        type: String,
        required: true,
        ref: 'Usuario'
    },
    mensaje: {
        type: String,
        required: true
    },
    timeStamps: {
        type: Date,
        default: Date.now
    }
})

MensajeSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Mensaje', MensajeSchema);