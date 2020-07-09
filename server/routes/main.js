const express = require('express');
const router = express.Router();
const { listUser, createUser, editUser, deleteUser, signIn } = require('../controllers/user');
const { listProduct, createProduct, editProduct, updateProduct, deleteProduct } = require('../controllers/product');
const uploadCheck = require('../middleware/uploadMiddleware');
var helper = require('sendgrid').mail;
const async = require('async');
const auth = require('../middleware/auth')
//user
router.get('/user', listUser);
router.post('/user/create', auth, createUser);
router.put('/user/edit/:id', auth, editUser);
router.delete('/user/delete/:id', auth,deleteUser);
router.post('/user/login', uploadCheck.single('image'),signIn)

//product
router.get('/product',listProduct);
router.post('/product/create', [uploadCheck.single('image'), auth], createProduct);
router.get('/product/edit/:id', [auth], editProduct);
router.put('/product/update/:id', [auth, uploadCheck.single('image')], updateProduct);
router.delete('/product/delete/:id', [auth], deleteProduct);


module.exports = router;
