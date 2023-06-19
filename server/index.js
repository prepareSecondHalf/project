const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/index");
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/auth");
const app = express();

app.use(hpp());
app.use(helmet());
app.use(cookieParser());

// application/x-www-form-urlencorded 이렇게 된 데이터를 가져와서 분석
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 데이터 받아와 분석
app.use(bodyParser.json());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());

const { MONGO_URI, PORT } = config;

let mongo_url = "";
let port = "";

if (process.env.NODE_ENV === "production") {
  mongo_url = process.env.MONGO_URI;
  port = process.env.PORT;
} else {
  port = PORT;
  mongo_url = MONGO_URI;
}

mongoose
  .set("strictQuery", true)
  .connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connecting success");
  })
  .catch((err) => {
    console.log(err);
  });

// app.use("/api/user", require("./routes/api/user"));

const server = http.createServer(app);

const webSocket = require("./middleware/socket");
const { User } = require("./models/user");
webSocket(server);

app.post("/api/user/register", async (req, res) => {
  `회원가입 시 필요한 정보들을 클라이언트에서 가져와 db에 삽입 feat.bodyParser`;
  console.log("[/api/user/register] >>>> ", req.body);
  const user = new User(req.body); // instance 생성
  await user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
});

app.post("/api/user/login", async (req, res) => {
  console.log("[/api/user/login]1 >>>> ", req.body.userInfo);

  if (req.body.userInfo.type  === 'googleLogIn') {
    req.cookies = "GoogleCookie";
    console.log("googleLogin check@@@@@@");
    return res.cookie("x_auth", "GoogleCookie").status(200).json({
          loginSuccess: true,
          // email: userInfo.email,
          // password: userInfo.password,
          cookies: "GoogleCookie",
        });
  } else {
    // 요청된 이메일을 DB에서 찾기
    await User.findOne({ email: req.body.userInfo.email }).then((userInfo) => {
      console.log("[/api/user/login]2 >>>> ", userInfo);

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
      userInfo.comparePassword(req.body.userInfo.password, (err, isMatch) => {
        // userInfo.comparePassword("password123", (err, isMatch) => {
        console.log("isMatch", isMatch);
        console.log("isMatch", req.body.userInfo);
        console.log("isMatch", req.body.userInfo.password);

        if (!isMatch)
          return res.status(400).json({
            loginSuccess: false,
            message: "비밀번호가 틀렸습니다.",
          });

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
      });
    });
  }

  // console.log("[/api/user/login] >>>> ", res);
});

app.post("/api/user/logout", auth, async (req, res) => {
  console.log("[/api/user/logout1]@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  await User.findOneAndUpdate({ _id: req.user._id }, { token: "" })
    // await User.findOneAndUpdate({ email: req.user.email }, { token: "" })
    .then((user) => {
      console.log(
        "[/api/user/logout2]@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
      );
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
app.get("/api/user/auth", auth, (req, res) => {
  // 여기 미들웨어(auth)까지 통과했다는 것은 authentication이 true라는 말
  console.log("[/api/user/auth1]", req.user); // res에서 확인되어야 하는게 맞는거 아닌가??!?!?!
  console.log("[/api/user/auth2]", req.cookies); // res에서 확인되어야 하는게 맞는거 아닌가??!?!?!
  // console.log("auth", res.cookies);
  if (req.cookies.x_auth === "GoogleCookie") return res.status(200).json({cookie: "GoogleCookie"})
  return res.status(200).json({
    _id: req.user._id,
    // isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    birth: req.user.birth,
    phone_number: req.user.phone_number,
    cookie: req.cookies.x_auth ? req.cookies.x_auth : null ,
    // role: req.user.role,
  });
});

app.post("/api/user/dropMember", async (req, res) => {
  console.log("[/api/user/memberout] >>>> ", req.body);

  // 요청된 이메일을 DB에서 찾기
  await User.findOne({ email: req.body.userInfo.email }).then((userInfo) => {
    console.log("[/api/user/dropMember] >>>> ", userInfo._id);
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

app.get("/", (req, res) => {
  res.send("Hello Reviews!!!!");
});
server.listen(port, () => {
  console.log(`Server started on ${PORT} port`);
});
