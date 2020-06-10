const express = require('express');
const router = express.Router();
const { listUser, createUser, editUser } = require('../controllers/user');
var bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({
    extended: true
}));
router.get('/list', listUser);
router.post('/create', createUser);
router.post('/edit', editUser);
module.exports = router;