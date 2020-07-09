'use strict';
const Product =  require('../models/product');
const {upload, deleteImage} = require('../helper/upload')

//function
export function listProduct(req, res) {
    Product.find({}, function (err, product) {
        return res.status(200).json(product);
    });
}

// create new cause
export async function createProduct(req, res) {
    if (req.file) {
        req.body['image'] = await upload(req.file);
    }
    let newProduct = new Product(req.body);
    newProduct.save(async function (err, product) {
        if (err) {
            deleteImage(req.body['image'])
            return res.status(400).send({
                message: err
            });
        } else {
            var products = await Product.find({});
            return res.json(products);
        }
    });
}

export function editProduct(req, res) {
    let id = req.params.id;
    Product.findOne({_id: id}, function (err, product) {
        return res.status(200).json(product);
    });
}

export async function updateProduct(req, res) {
    let id = req.params.id;
    let data = req.body;
    var oldImage = await Product.findOne({_id: id});
    if (req.file) {
        data['image'] = await upload(req.file)
    }
    Product.findOneAndUpdate({_id: id}, {$set: data})
        .exec()
        .then(async (product) => {
            if (oldImage!==null && oldImage.image !== 'undefined') {
                deleteImage(oldImage.image)
            }
            var products = await Product.find({});
            res.status(200).json(products);
        })
        .catch((err) => {
            deleteImage(req.body['image'])
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.'
            });
        });
}

export async function deleteProduct(req, res) {
    let id = req.params.id;
    var image = await Product.findOne({_id: id});
    Product.deleteOne({_id: id})
        .exec()
        .then(async () => {
            if (image.image !== 'undefined') {
                deleteImage(image.image)
            }
            var products = await Product.find({});
            res.status(200).json(products);
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.'
            });
        });
}

