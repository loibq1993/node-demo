const express = require('express');
const router = express.Router();
const { listUser, createUser, editUser, deleteUser } = require('../controllers/user');
const { listProduct, createProduct, editProduct, updateProduct, deleteProduct } = require('../controllers/product');
const uploadCheck = require('../middleware/uploadMiddleware');
var helper = require('sendgrid').mail;
const async = require('async');

//user
router.get('/user', listUser);
router.post('/user/create', createUser);
router.put('/user/edit/:id', editUser);
router.delete('/user/delete/:id', deleteUser);
router.post('/user/send', function (req, res, next) { 
    
});

//product
router.get('/product',listProduct);
router.post('/product/create', uploadCheck.single('image'), createProduct);
router.get('/product/edit/:id',editProduct);
router.put('/product/update/:id', uploadCheck.single('image'), updateProduct);
router.delete('/product/delete/:id', deleteProduct);


module.exports = router;
