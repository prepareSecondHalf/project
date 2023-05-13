const mongoose = require('mongoose');
const bcrpt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  birth: {
    type: Number,
    // required: true,
  },
  phone_number: {
    type: Number,
    // required: true,
  },
  token : {
    type: String,
  },
  // token 유효기간
  tokenExp :{
      type: Number
  }
});

const User = mongoose.model('user', UserSchema);

module.exports = { User };
