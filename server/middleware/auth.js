const { User } = require("../models/user");

let auth = (req, res, next) => {
    // 인증처리 하는 곳

    // 클라이언트 쿠키에서 토큰을 가져오기
    let token = req.cookies.x_auth;

    // 토큰 복호화 후 유저 찾기
    // => 유저 있으면 인증 완료
    // => 유저 없으면 인증 불가
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true });

        // req에 token, user 정보를 넣어주어 index.js에서 사용할 수 있게 됨
        req.token = token;
        req.user = user;
        next();
    })


}

module.exports = { auth };