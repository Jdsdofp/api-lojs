const mongoose = require("../database");

const InputProductSchema = mongoose.Schema({
    id_input: {
        type: Number
    },
    nf: {
        type: String,
        required: [true, 'Digite a nota fiscal'],
        trim: true
    },
    provider: {
        type: mongoose.Types.ObjectId,
        ref: 'Provider'
    },
    dateNf: {
        type: String,
    },
    dateInput: {
        type: Date,
        default: Date.now()
    },
    products: [{
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    }],
    productsInputs: [{
        productId: { type: String },
        quantity: { type: Number }
    }]
})

const InputProduct = mongoose.model('InputProducts', InputProductSchema);

module.exports = InputProduct;