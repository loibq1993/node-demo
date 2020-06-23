const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique:true
  },
  hash_password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  role_id: {
    type: String,
    require: true
  },
  created: {
    type: Date,
    require: true,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);