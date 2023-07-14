const { User } = require("../models/user");

let auth = (req, res, next) => {
  // 인증처리 하는 곳

  // 클라이언트 쿠키에서 토큰을 가져오기
  // let token = req.cookies.x_auth;
  let token = req.cookies.x_auth;

  // 로그인할 땐, req에 쿠키가 담겨서 오고
  // 로그인 유지의 경우는, req에 값이 없다
  // console.log("[auth]@@@@@@@@@@@0", req.cookie, " : req.cookies");
  console.log("[auth]@@@@@@@@@@@0", req.cookies, " : req.cookies");
  // console.log("[auth]@@@@@@@@@@@1", req.body.cookies, " : req.cookies");
  // console.log("[auth]@@@@@@@@@@@2", req.body.userInfo, " : req.cookies");
  // console.log("[auth]@@@@@@@@@@@", req.body.userInfo.cookies, " : req.cookies");
  // console.log("[auth]@@@@@@@@@@@", req.body.userInfo.cookie, " : req.cookies");
  // console.log("[auth]@@@@@@@@@@@", req.body.userInfo.cookies, " : req.cookies");
  // console.log("[auth]@@@@@@@@@@@", req.cookies.x_auth, " : req.cookies");

  if (req.cookies) {
    console.log("[auth]♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥", req.cookie);
    console.log("[auth]★★★★★★★★★★★★★★★");

    // 토큰 복호화 후 유저 찾기
    // => 유저 있으면 인증 완료
    // => 유저 없으면 인증 불가
    User.findByToken(token, (err, user) => {
      console.log("[auth]$$$$$$$$$$$$$", token, " : token");
      console.log("[auth]$$$$$$$$$$$$$", user, " : user");

      if (err) throw err;
      if (!user && token !== "GoogleCookie")
        return res.json({ isAuth: false, error: true });

      // req에 token, user 정보를 넣어주어 index.js에서 사용할 수 있게 됨
      req.token = token;
      req.user = user;
      next();
    });
  }
};

module.exports = { auth };
