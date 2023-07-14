const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/index");
const { auth } = require("../middleware/auth");
const { User } = require("../models/user");
const { imp_key, imp_secret } = process.env;
const axios = require("axios");

// const { UserTmp } = require('../../models/userTmp');
// const { User } = require("./models/user");

const { JWT_SECRET } = config;

const router = express.Router();

// 회원가입 / POST
router.post("/register", async (req, res) => {
  `회원가입 시 필요한 정보들을 클라이언트에서 가져와 db에 삽입 feat.bodyParser`;
  // const { name, email, password, phone, nickname } = req.body;
  console.log("[/register0] >>>> ", req.body);

  // if (!name)
  //   return res
  //     .status(400)
  //     .json({ success: false, msg: "이름을 작성해주세요." });
  // else if (!email)
  //   return res
  //     .status(400)
  //     .json({ success: false, msg: "이메일을 작성해주세요." });
  // else if (!password)
  //   return res
  //     .status(400)
  //     .json({ success: false, msg: "비밀번호를 입력해주세요." });
  // else if (!phone)
  //   return res
  //     .status(400)
  //     .json({ success: false, msg: "휴대폰 번호를 입력해주세요." });
  // else if (!nickname)
  //   return res
  //     .status(400)
  //     .json({ success: false, msg: "닉네임을 입력해주세요." });

  console.log("[/register1] >>>> ", req.body);
  const user = new User(req.body); // instance 생성
  console.log("[/register1] >>>> ", user);

  await user
    .save()
    .then((user) => {
      // token 생성을 위해 가장 많이 쓰는 json web token 사용
      console.log("[/register2] >>>> ", req.body);
      console.log("[/register2] >>>> ", user);

      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      res.json({ success: false, err });
    });

  console.log("[/register3] >>>> ", user);

  // User.findOne({ email }).then(async (userData) => {
  //   if (userData)
  //     return res
  //       .status(400)
  //       .json({ success: false, msg: "이미 존재하는 이메일입니다." });

  // console.log("[/register1] >>>> ", req.body);
  // const user = new User(req.body); // instance 생성
  // console.log("[/register1] >>>> ", user);

  // await user
  //   .save()
  //   .then((user) => {
  //     // token 생성을 위해 가장 많이 쓰는 json web token 사용
  //     console.log("[/register2] >>>> ", req.body);
  //     console.log("[/register2] >>>> ", user);

  //     res.status(200).json({
  //       success: true,
  //     });
  //   })
  //   .catch((err) => {
  //     res.json({ success: false, err });
  //   });

  // console.log("[/register3] >>>> ", user);

  // 비밀번호 암호화
  // bcrypt 사용한다고 하셔서 bcrypt 이용했고
  // bcrypt는 해쉬 방식 사용
  // genSalt를 이용해 10자리 salt를 만들고
  // bcrypt.genSalt(10, (err, salt) => {
  //   // salt와 입력받은 비밀번호를 이용해 암호화된 hash를 만듦
  //   bcrypt.hash(newUser.password, salt, (err, hash) => {
  //     if (err) return res.status(400).json({ err });

  //     newUser.password = hash;
  //     newUser
  //       .save()
  //       .then((user) => {
  //         // token 생성을 위해 가장 많이 쓰는 json web token 사용
  //         jwt.sign(
  //           { id: user.id },
  //           JWT_SECRET``,
  //           { expiresIn: "1h" },
  //           (err, token) => {
  //             if (err) return res.status(400).json({ err });

  //             res.json({
  //               success: true,
  //               token,
  //               user: {
  //                 id: user.id,
  //                 name: user.name,
  //                 email: user.email,
  //               },
  //             });
  //           }
  //         );
  //       })
  //       .catch((err) => {
  //         res.json({ success: false, err });
  //       });
  //   });
  // });
  // });
});

// 이메일 로그인 / POST
router.post("/login", async (req, res) => {
  const { email, password } = req.body.userInfo;
  console.log("[/login1] ===> ", email, password, "/");
  console.log("[/login2] ===> ", req.body, "/");
  console.log("[/login3] ===> ", res.body, "/");

  if (!email)
    return res
      .status(400)
      .json({ success: false, msg: "이메일을 작성해주세요." });
  else if (!password)
    return res
      .status(400)
      .json({ success: false, msg: "비밀번호를 작성해주세요." });

  if (req.body.userInfo.type === "googleLogIn") {
    req.cookies = "GoogleCookie";
    console.log(
      "googleLogin check =============>>>>>>",
      req.body.userInfo.email,
      req.body.userInfo.password
    );
    return res.cookie("x_auth", "GoogleCookie").status(200).json({
      loginSuccess: true,
      email: req.body.userInfo.email,
      password: req.body.userInfo.password,
      cookies: "GoogleCookie",
    });
  } else {
    // 요청된 이메일을 DB에서 찾기
    await User.findOne({ email: req.body.userInfo.email }).then((userInfo) => {
      console.log("[/login]2 >>>> ", userInfo);

      if (req.body.userInfo.password === "GooglePasswordNotSet") {
        return res.status(200).json({
          loginSuccess: true,
          message: "Google Social Login Success",
        });
      }
      if (!userInfo) {
        return res.status(403).json({
          loginSuccess: false,
          message: "제공된 이메일에 해당하는 유저가 없습니다.",
        });
      }
      // 요청된 이메일이 DB에 있다면 비밀번호가 맞는지 확인
      // 암호화 한 패스워드는 절대 복호화되면 안됨
      // 이건 bcrypt 뿐 아니라 어디서든 거의 무조건입니다.
      // 하지만 복호화가 안되기 때문에 받아온 데이터를 다시 암호화해, 암호화되어 있던 데이터와 비교합니다.
      console.log(
        "[bcrypt compare] ======> ",
        password,
        "and",
        userInfo.password,
        "and",
        req.body.userInfo.password
      );
      userInfo.comparePassword(req.body.userInfo.password, (err, isMatch) => {
        // userInfo.comparePassword(password, (err, isMatch) => {
        // userInfo.comparePassword(userInfo.password, (err, isMatch) => {
        // bcrypt.compare(password, userInfo.password).then((isMatch) => {
        // 요청된 이메일이 DB에 있다면 비밀번호가 맞는지 확인
        // userInfo.comparePassword(req.body.userInfo.password, (err, isMatch) => {
        // userInfo.comparePassword("password123", (err, isMatch) => {
        console.log("isMatch", isMatch);
        console.log("isMatch", req.body.userInfo);
        console.log("isMatch", req.body.userInfo.password);

        if (!isMatch)
          return res.status(400).json({
            loginSuccess: false,
            message: "비밀번호가 틀렸습니다.",
          });
        if (!isMatch)
          return res
            .status(400)
            .json({ success: false, msg: "비밀번호를 확인해주세요." });

        // 비밀번호까지 맞다면 토큰 생성하기
        userInfo.generateToken((err, user) => {
          // console.log("[generateToken]<<<<<<<<<<<<<<<<<<<<<<<<<", user);
          console.log("[generateToken]<<<<<<<<<<<<<<<<<<<<<<<<<", userInfo);
          // console.log("[generateToken]>>>", user.token);
          // res.cookie("x_auth", user.token).status(200).json({
          res.cookie("x_auth", userInfo.token).status(200).json({
            loginSuccess: true,
            user: userInfo,
            // email: userInfo.email,
            // password: userInfo.password,
            // cookie: userInfo.cookie,
          });

          console.log(
            "[generateToken]x_auth<<<<<<<<<<<<<<<<<<<<<<<<<",
            res.cookie
          );
        });

        // console.log("jwt sign before console");
        // jwt.sign(
        //   { id: userInfo.id },
        //   JWT_SECRET,
        //   { expiresIn: "1h" },
        //   (err, token) => {
        //     if (err) return res.status(400).json({ success: false, msg: err });

        //     console.log("token  ====> ", token, "<====");
        //     res.cookie("x_auth", token).status(200).json({
        //       success: true,
        //       token,
        //       userInfo,
        //       // userInfo: {
        //       //   id: userInfo.id,
        //       //   name: userInfo.name,
        //       //   email: userInfo.email,
        //       // },
        //     });
        //   }
        // );
      });
    });
  }
});

router.post("/logout", auth, async (req, res) => {
  console.log("[/logout1]@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  await User.findOneAndUpdate({ _id: req.user._id }, { token: "" })
    // await User.findOneAndUpdate({ email: req.user.email }, { token: "" })
    .then((user) => {
      console.log("[/logout2]@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      return res.clearCookie("x_auth").status(200).send({
        success: true,
      });
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
});

// role 0 : 일반 유저
// role 1 : 어드민
// role 2 : 특정 부서 어드민
// backtick 쓰면 에러
router.get("/auth", auth, (req, res) => {
  // 여기 미들웨어(auth)까지 통과했다는 것은 authentication이 true라는 말
  console.log("[/auth1]", req.user); // res에서 확인되어야 하는게 맞는거 아닌가??!?!?!
  console.log("[/auth2]", req.cookies); // res에서 확인되어야 하는게 맞는거 아닌가??!?!?!
  // console.log("auth", res.cookies);
  if (req.cookies.x_auth === "GoogleCookie")
    return res.status(200).json({ cookie: "GoogleCookie", type: "google" });
  return res.status(200).json({
    _id: req.user._id,
    // isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    birth: req.user.birth,
    phone_number: req.user.phone_number,
    cookie: req.cookies.x_auth ? req.cookies.x_auth : null,
    type: "normal",
    // role: req.user.role,
  });
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    // No token provided
    console.log("token is null");
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      // Invalid token
      console.log(err, " : err");
      // return res.json({
      //   success: false,
      //   message: 'expired',
      //   status: 403
      // });
      return res.sendStatus(403);
    }

    // Token is valid, store the user object in the request for further processing
    req.user = user;
    next();
  });
};

router.delete("/close/:id", async (req, res) => {
  console.log("[/memberout] >>>> ", req.body);

  // 요청된 이메일을 DB에서 찾기
  await User.findOne({ email: req.body.userInfo.email }).then((userInfo) => {
    console.log("[/dropMember] >>>> ", userInfo._id);
    try {
      User.deleteOne({ _id: userInfo._id });
    } catch (e) {
      console.warn(e);
    }
    // User.deleteOne({ _id: "64845f48611660a23752792f" });
    // User.deleteOne({ email: userInfo.email });
    // User.deleteOne("64845f48611660a23752792f");
  });
});

router.get("/myprofile", authenticateToken, (req, res) => {
  const { id } = req.user;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, msg: "로그인 후 이용하실 수 있습니다." });
  } else {
    User.findOne({ _id: id }).then((user) => {
      if (user) res.json({ success: true, user });
    });
  }
});

router.post("/email", async (req, res) => {
  console.log("[/email] >>>> ", req.body);
  console.log("[/email] >>>> ", req.body.email);

  // 요청된 이메일을 DB에서 찾기
  let result = await User.findOne({ email: req.body.email });
  if (result === null) {
    return res.status(200).json({
      success: true,
      value: "중복된 이메일이 없습니다",
    });
  }
  return res.status(200).json({
    success: false,
    value: "중복값이 존재합니다.",
  });
});

router.post("/nickname", async (req, res) => {
  console.log("[/nickname] >>>> ", req.body);
  console.log("[/nickname] >>>> ", req.body.nickname);

  // 요청된 이메일을 DB에서 찾기
  let result = await User.findOne({ nickname: req.body.nickname });
  if (result === null) {
    return res.status(200).json({
      success: true,
      value: "중복된 닉네임이 없습니다",
    });
  }
  return res.status(200).json({
    success: false,
    value: "중복값이 존재합니다.",
  });
});

router.put("/password", async (req, res) => {
  console.log("[/memberout] >>>> ", req.body);

  // 요청된 이메일을 DB에서 찾기
  await User.findOne({ email: req.body.userInfo.email }).then((userInfo) => {
    console.log("[/dropMember] >>>> ", userInfo._id);
    try {
      User.deleteOne({ _id: userInfo._id });
    } catch (e) {
      console.warn(e);
    }
    // User.deleteOne({ _id: "64845f48611660a23752792f" });
    // User.deleteOne({ email: userInfo.email });
    // User.deleteOne("64845f48611660a23752792f");
  });
});

router.get("/search/:searchTerm", async (req, res) => {
  console.log("[searchTerm] 1>>>> ", req.body);

  // 요청된 이메일을 DB에서 찾기
  // await User.findOne({ email: req.body.userInfo.email }).then((userInfo) => {
  //   console.log("[/find email] >>>> ", userInfo._id);
  //   try {
  //     User.deleteOne({ _id: userInfo._id });
  //   } catch (e) {
  //     console.warn(e);
  //   }
  //   // User.deleteOne({ _id: "64845f48611660a23752792f" });
  //   // User.deleteOne({ email: userInfo.email });
  //   // User.deleteOne("64845f48611660a23752792f");
  // });
});

router.post("/certifications", async (req, res) => {
  const { imp_uid } = req.body;
  const { data } = req.body;
  // const { id } = req.user;
  console.log("/certifications ==>", data);
  console.log("/certifications ==>1", imp_key);
  console.log("/certifications ==>2", imp_secret);

  if (!imp_uid) {
    console.log(data);
    return res.status(400).json({
      success: false,
      msg: "imp_uid값이 없습니다. 다시 확인해주세요.",
    });
  } else {
    try {
      // 인증 토큰 발급 받기
      const getToken = await axios({
        url: "https://api.iamport.kr/users/getToken",
        // POST method
        method: "post",
        // "Content-Type": "application/json"
        headers: { "Content-Type": "application/json" },
        data: {
          imp_key: imp_key, // REST API키
          imp_secret: imp_secret, // REST API Secret
        },
      });

      console.log("/certifications2 ==>", getToken.data.response);
      const { access_token } = getToken.data.response; // 인증 토큰
      // imp_uid로 인증 정보 조회
      console.log("/certifications3 ==>", access_token);

      const getCertifications = await axios({
        // imp_uid 전달
        url: `https://api.iamport.kr/certifications/${imp_uid}`,
        // url: \`https://api.iamport.kr/certifications/\${imp_uid}\`,
        // GET method
        method: "get",
        // 인증 토큰 Authorization header에 추가
        headers: { Authorization: access_token },
      });
      const certificationsInfo = getCertifications.data; // 조회한 인증 정보
      console.log("/certifications4 ==>", certificationsInfo);
      return res.status(200).json(certificationsInfo);
    } catch (e) {
      console.log("/certifications err");
      // console.error(e);
    }
  }
});

router.post("/update", async (req, res) => {
  const { data } = req.body;
  // const { id } = req.user;

  if (!data.userid) {
    console.log(data);
    return res
      .status(400)
      .json({ success: false, msg: "로그인을 확인해주세요." });
  } else {
    const updateQuery = {
      $set: {
        nickname: data.nickname,
        phone: data.phone,
        photo: data.photo,
        lang: data.lang,
      },
    };
    const option = { returnOriginal: false };

    try {
      const updateUser = await UserTmp.findOneAndUpdate(
        { _id: data.userid },
        updateQuery,
        option
      );
      console.log(updateUser);
      return res.json({
        success: true,
        message: "수정이 완료되었습니다.",
      });
    } catch (err) {
      if (err) {
        console.error(err, " : err");
        return res.json({ success: false, message: err });
      }
    }
  }
});

router.post("/cashcharge", async (req, res) => {});

module.exports = router;
