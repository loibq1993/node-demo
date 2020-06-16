'use strict';
const Product =  require('../models/product');


//function
export function listProduct(req, res) {
    Product.find({}, function (err, product) {
        return res.status(200).json(product);
    });
}

// create new cause
export function createProduct(req, res) {
    req.body['image'] = req.file.originalname;

    var newProduct = new Product(req.body);
    newProduct.save(function(err, product) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            return res.json(product);
        }
    });
}

export function editProduct(req, res) {
    let id = req.params.id;
    let data = req.body;
    Product.updateOne({ _id:id }, { $set:data })
        .exec()
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'Product is updated',
                updateProduct: data,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.'
            });
        });
}

export function deleteProduct(req, res) {
    let id = req.params.id;
    Product.deleteOne({ _id: id})
        .exec()
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'Product is deleted',
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.'
            });
        });
}

