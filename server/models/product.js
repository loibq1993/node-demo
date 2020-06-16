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
        require: true
    },
    price: {
        type: Number,
        require: true,
        trim: true,
    },
    active: {
        type: Boolean,
        require: true
    },
    created: {
        type: Date,
        require: true,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);