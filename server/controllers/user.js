'use strict';
const User =  require('../models/user');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);


export function listUser(req, res) {
  User.find({}, function (err, user) {
    return res.status(200).json(user);
  });
}

// create new cause
export function createUser(req, res) {
  var newUser = new User(req.body);
  var hash = bcrypt.hashSync("B4c0/\/", salt);
  newUser.hash_password = bcrypt.hashSync(req.body.hash_password, salt);
  newUser.save(function(err, user) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      user.hash_password = undefined;
      return res.json(user);
    }
  });
};

export function editUser(req, res) {
  let id = req.query._id;
  let data = req.query;
  User.update({ _id:id }, { $set:data })
  .exec()
  .then(() => {
    res.status(200).json({
      success: true,
      message: 'User is updated',
      updateUser: data,
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

export function signIn(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.status(401).json({ message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (!user.comparePassword(req.body.password)) {
        res.status(401).json({ message: 'Authentication failed. Wrong password.' });
      } else {
        return res.json({token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id}, 'RESTFULAPIs')});
      }
    }
  });
}

export function loginRequired(req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};