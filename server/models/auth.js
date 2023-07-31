const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const moment = require("moment");
const config = require("../config/index");

const AuthSchema = new mongoose.Schema({
  token: {
    type: String,
  },
});

AuthSchema.methods.create = function (token, cb) {
  let auth = this;
  console.log("save token ===> ", auth);
  auth.token = token;
  console.log("save auth token ====> ", auth);

  //   cb(null, auth);
};

const Auth = mongoose.model("Auth", AuthSchema);

module.exports = { Auth };
