const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const moment = require("moment");
const config = require("../config/index");

const { JWT_SECRET } = config;

// console.log("jwt_secret  ===> ", JWT_SECRET);

const UserSchema = new mongoose.Schema({
  // id: {
  //   type: String,
  //   trim: true,
  //   required: true,
  // },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // unique key
  },
  password: {
    type: String,
    required: true,
    // minlength: 8,
  },
  nickname: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    enum: ["LV1", "LV2", "LV3", "LV4", "LV5"],
    default: "LV1",
    required: true,
  },
  point: {
    type: Number,
    required: true,
    default: 0,
  },
  phone: {
    type: String,
    required: true,
  },
  login_way: {
    type: String,
    required: true,
    default: "email",
  },
  comments: [
    // type: Object,
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "review",
    },
  ],
  lang: [
    {
      type: String,
      required: true,
    },
  ],
  photo: {
    type: String,
    required: true,
    default: "https://dummyimage.com/600x400/000000/fff.png", // 변경할거
  },
  register_date: {
    type: Date,
    default: moment().format("MMMM DD, YYYY"),
  },
  chatRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chatRoom",
  },
  reputation: {
    type: Number,
    required: true,
    default: 0.0,
  },
  isSubmit: {
    type: Boolean,
    required: true,
    default: false,
  },
  profile_img: {
    type: String,
    default: "https://dummyimage.com/600x400/000000/fff.png", // 변경할거
  },
});

UserSchema.pre("save", function (next) {
  let user = this; // UserSchema 가리킴
  console.log("save[save]>>>>", user);
  // console.log("pre1>>>>", user);
  // if (user.isModified("password") || user.isModified("token")) {
  // > token이 생성되면서 password hashing이 새로 됨
  // > 결국, 비밀번호끼리 불일치 현상 발생 (주의!!!)
  if (user.isModified("password")) {
    // 비밀번호 암호화 : bcrypt
    console.log("pre2[isModified]>>>>", user);

    bcrypt.genSalt(saltRounds, function (err, salt) {
      console.log("pre3[isModified]>>>>", err, salt, ";");
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        console.log("pre4[isModified]>>>>", user, ";");
        next();
      });
    });
  } else {
    console.log("pre5[NOTisModified]>>>>", user);
    next();
  }
});

UserSchema.methods.comparePassword = function (plainPassword, cb) {
  let user = this;
  // bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
  bcrypt.compare(plainPassword, user.password, function (err, isMatch) {
    console.log("[comparePassword]plain>>", plainPassword);
    console.log("[comparePassword]err>>", err);
    console.log("[comparePassword]user.password>>", user.password);
    console.log("[comparePassword]isMatch", isMatch);
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

UserSchema.methods.generateToken = function (cb) {
  let user = this;
  // console.log("generateToken1>>>>>", user);
  // jsonwebtoken을 이용한 token 생성
  let token = jwt.sign(user._id.toHexString(), JWT_SECRET);

  // user._id + JWT_SECRET = token
  // ->
  // JWT_SECRET => user._id

  user.token = token;
  // console.log("generateToken2>>>>>", user);

  user.save().then((err, user) => {
    // console.log("generateToken3>>>>>", user);

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
  // console.log("findByToken1 >>>>>>>>", token);
  // console.log("findByToken1 >>>>>>>>", JWT_SECRET);

  // 토큰 디코드
  jwt.verify(token, JWT_SECRET, function (err, decoded) {
    // console.log("findByToken2 >>>>>>>>", token);
    // console.log("findByToken3 >>>>>>>>", decoded);
    // console.log("findByToken4 >>>>>>>>", user);2

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
