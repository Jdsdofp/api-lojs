const mongoose = require("../database/");

const ProductSchema = mongoose.Schema({
    codigo: {
        type: String,
        trim: true,
        require: true,
        default: 0
    },
    catergory: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: true,
        trim: true,
        min: 0,
        max: 130
    },
    price: {
        type: Number,
        max: 100000000,
        default: 0
    },
    profitPercentage: {
        type: Number,
        select: false,
        max: 10000,
        default: 0
    },
    thumbnail: {
        type: String
    },
    quantity: {
        type: Number,
        default: 0
    },
    minStock: {
        type: Number,
        select: false,
        default: 0
    }

})

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;