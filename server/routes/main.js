const express = require('express');
const router = express.Router();
const { listUser, createUser, editUser, deleteUser } = require('../controllers/user');
const { listProduct, createProduct, editProduct, deleteProduct } = require('../controllers/product');
const uploadCheck = require('../middleware/uploadMiddleware');

//user
router.get('/user', listUser);
router.post('/user/create', createUser);
router.put('/user/edit/:id', editUser);
router.delete('/user/delete/:id', deleteUser);

//product
router.get('/product',listProduct);
router.post('/product/create', uploadCheck.single('image'), createProduct);
router.put('/product/edit/:id', editProduct);
router.delete('/product/delete/:id', deleteProduct);


module.exports = router;
