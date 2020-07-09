'use strict';
const User =  require('../models/user');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const {sendWelcomeEmail} = require('../helper/sendmail');
const jwt = require('jsonwebtoken');
const {generateAuthToken} = require('../helper/jwt.helper')

export function listUser(req, res) {
  User.find({}, function (err, user) {
    return res.status(200).json(user);
  });
}

// create new cause
export async function createUser(req, res) {
  var newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.hash_password, salt);
  try {
      await newUser.save();
      sendWelcomeEmail('buiquangloi1993@gmail.com', newUser.username);
      newUser.hash_password = undefined;
      const token = await generateAuthToken(newUser);
      res.status(200).send({
        user: newUser, token
      });
  } catch (err) {
      res.status(400).send({
        message: err
      });
  };
};

export function editUser(req, res) {
  let token = req.body.token;
  let id = req.params.id;
  let data = req.body;
  const filter = {
    _id:id,
    'tokens.token': token
  };
  data.hash_password = bcrypt.hashSync(data.hash_password, salt)
  User.updateOne(filter, { $set:data })
  .exec()
  .then(() => {
    res.status(200).json({
      success: true,
      message: 'User is updated',
      updateUser: data,
    });
  }) 
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.'
    });
  });
}

export function deleteUser(req, res) {
  let id = req.params.id;
  User.deleteOne({
    _id: id
  })
  .exec()
  .then(() => {
    res.status(200).json({
      success: true,
      message: 'User is deleted',
    });
  }) 
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.'
    });
  });
}

export async function signIn(req, res) {
  try {
    const user = await User.findOne({email: req.body.email})
    if (!user) {
      throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(req.body.hash_password, user.hash_password);

    if (!isMatch) {
      throw new Error('Unable to login')
    }
    const token = await generateAuthToken(user);
    res.send({user, token});
  } catch (e) {
    res.status(400).send(e);
  }
}

export function loginRequired(req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};