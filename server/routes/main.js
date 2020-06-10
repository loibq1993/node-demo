const express = require('express');
const router = express.Router();
const { listUser, createUser, editUser } = require('../controllers/user');
router.get('/list', listUser);
router.post('/create', createUser);
router.post('/edit', editUser);
module.exports = router;