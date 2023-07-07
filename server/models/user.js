const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const moment = require("moment");

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
  },
  nickname: {
    type: String,
    trim: true,
    required: true,
  },
  grade: {
    // type: Enumerator,
    type: Number,
    trim: true,
    required: true,
  },
  point: {
    type: Number,
    trim: true,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
    required: true,
  },
  login_way: {
    type: String,
    trim: true,
    required: true,
  },
  comments: {
    type: Object,
    trim: true,
  },
  reviews: {
    type: Object,
    trim: true,
  },
  lang: {
    type: String,
    trim: true,
    required: true,
  },
  photo: {
    type: String,
    trim: true,
    required: true,
  },
  register_date: {
    type: Date,
    trim: true,
    required: true,
  },
  chat: {
    type: String, Function,
    trim: true,
  },
  reputation: {
    // type: Float32Array,
    type: String,
    trim: true,
    required: true,
  },
  isSubmit: {
    type: Boolean,
    trim: true,
    required: true,
  },
  profile_img: {
    type: String,
    trim: true,
  },
  note: {
    type: String,
    trim: true,
  },
});

UserSchema.pre("save", function (next) {
  let user = this; // UserSchema 가리킴
  console.log("pre1>>>>", user);
  // if (user.isModified("password") || user.isModified("token")) {
  // > token이 생성되면서 password hashing이 새로 됨
  // > 결국, 비밀번호끼리 불일치 현상 발생 (주의!!!)
  if (user.isModified("password")) {
    // 비밀번호 암호화 : bcrypt
    console.log("pre2[isModified]>>>>", user);

    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    console.log("pre3[NOTisModified]>>>>", user);

    next();
  }
});

UserSchema.methods.comparePassword = function (plainPassword, cb) {
  let user = this;
  // bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
  bcrypt.compare(plainPassword, user.password, function (err, isMatch) {
    console.log("[comparePassword]plain>>", plainPassword);
    // console.log("[comparePassword]this.password>>", this.password);
    console.log("[comparePassword]user.password>>", user.password);
    console.log("[comparePassword]isMatch", isMatch);
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

UserSchema.methods.generateToken = function (cb) {
  let user = this;
  console.log("generateToken1>>>>>", user);
  // jsonwebtoken을 이용한 token 생성
  let token = jwt.sign(user._id.toHexString(), "secretToken");

  // user._id + 'secretToken' = token
  // ->
  // 'secretToken' => user._id

  user.token = token;
  console.log("generateToken2>>>>>", user);

  user.save().then((err, user) => {
    console.log("generateToken3>>>>>", user);

    // if (err) return res.status(400).send(err);
    if (err) return cb(err);
    cb(null, user);
    // 토큰을 저장 후 쿠키 혹은 로컬스토리지 등에 저장할 수 있음
  });
};

// UserSchema.methods.deleteOne = function (cb) {
//   const user = this;

//   user.deleteOne().then((err, user) => {
//     // if (err) return res.status(400).send(err);
//     if (err) return cb(err);
//     cb(null, user);
//     // 토큰을 저장 후 쿠키 혹은 로컬스토리지 등에 저장할 수 있음
//   });
// };

UserSchema.statics.findByToken = function (token, cb) {
  const user = this;
  console.log("findByToken1 >>>>>>>>", token);

  // 토큰 디코드
  jwt.verify(token, "secretToken", function (err, decoded) {
    console.log("findByToken2 >>>>>>>>", token);
    console.log("findByToken3 >>>>>>>>", decoded);
    // 유저 아이디를 이용해 유저를 찾은 다음
    // 클라이언트에서 가져온 토큰과 DB에 보관된 토큰이 일치하는지 확인
    // user.findOne({"email": decoded, "token": token})
    user
      // .findOne({ _id: decoded, token: 'eyJhbGciOiJIUzI1NiJ9.NjQ4NDVmNDg2MTE2NjBhMjM3NTI3OTJm.-15hLo3n5VOrVWetNfjq9tWW8_ImWZNlOhn98Pfq4m4' })
      .findOne({
        _id: decoded,
        token: token,
      })
      .then((user) => {
        cb(null, user);
      })
      .catch((err) => {
        if (err) return cb(err);
      });
  });
};

const User = mongoose.model("user", UserSchema);

module.exports = { User };
