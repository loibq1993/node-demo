const express = require('express');
const router = express.Router();
const { listUser, createUser, editUser, deleteUser, signIn } = require('../controllers/user');
const { listProduct, createProduct, editProduct, updateProduct, deleteProduct } = require('../controllers/product');
const uploadCheck = require('../middleware/uploadMiddleware');
var helper = require('sendgrid').mail;
const async = require('async');
const auth = require('../middleware/auth')
const role = require('../middleware/role')
//user
router.get('/user', listUser);
router.post('/user/create', uploadCheck.single('image'), createUser);
router.put('/user/edit/:id', uploadCheck.single('image'), editUser);
router.delete('/user/delete/:id', auth,deleteUser);
router.post('/user/login', uploadCheck.single('image'), signIn)

//product
router.get('/product', auth,listProduct);
router.get('/product/create', [auth, role], createProduct);
router.post('/product/store', [uploadCheck.single('image'), auth, role], createProduct);
router.get('/product/edit/:id', [auth, role], editProduct);
router.put('/product/update/:id', [auth, uploadCheck.single('image'), role], updateProduct);
router.delete('/product/delete/:id', [auth, role], deleteProduct);

module.exports = router;
