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
  phoneNumber: {
    type: String,
    // type: Number,
    // required: true,
  },
  token : {
    type: String,
  },
  // token 유효기간
  tokenExp :{
    type: Number
  },
  role :{
    type: Number
  }
});

UserSchema.pre('save', function ( next ) {
  const user = this; // UserSchema 가리킴
  
  if (user.isModified('password')) {
    // 비밀번호 암호화 : bcrypt
    bcrpt.genSalt(saltRounds, function(err, salt) {
      if (err) return next(err);
      bcrpt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      })
    })
  } else {
    next();
  }
});

UserSchema.methods.comparePassword = function(plainPassword, cb) {
  bcrpt.compare(plainPassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  } )
}

UserSchema.methods.generateToken = function(cb) {
  const user = this;
  
  // jsonwebtoken을 이용한 token 생성
  const token = jwt.sign(user._id.toHexString(), 'secretToken')

  // user._id + 'secretToken' = token
  // ->
  // 'secretToken' => user._id

  user.token = token;
  user.save().then((err, user) => {
    // if (err) return res.status(400).send(err);
    if (err) return cb(err);
    cb(null, user);
    // 토큰을 저장 후 쿠키 혹은 로컬스토리지 등에 저장할 수 있음
  })
}

UserSchema.statics.findByToken = function(token, cb) {
  const user = this;

  // 토큰 디코드
  jwt.verify(token, 'secretToken', function(err, decoded) {
      // 유저 아이디를 이용해 유저를 찾은 다음 
      // 클라이언트에서 가져온 토큰과 DB에 보관된 토큰이 일치하는지 확인
      // user.findOne({"email": decoded, "token": token})
      user.findOne({"_id": decoded, "token": token})
      .then((user) => {
        cb(null, user);
      }).catch((err) => {
        if (err) return cb(err);
      })
  })
}

const User = mongoose.model('user', UserSchema);

module.exports = { User };
