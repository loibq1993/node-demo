const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        default:0
    },
    active: {
        type: Boolean,
        default:false,
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);