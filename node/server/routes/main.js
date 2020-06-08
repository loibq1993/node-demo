'use strict';

const express = require('express');
const { createUser, signIn } = require('../controllers/user');
module.exports = function(app) { 
    const router = express.Router();
    router.post('/auth/register', createUser);
    router.post('/auth/signin', signIn);
}
