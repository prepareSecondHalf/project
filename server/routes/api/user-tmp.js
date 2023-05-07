const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserTmp } = require('../../models/userTmp');
const config = require('../../config/index');

const { JWT_SECRET } = config;

const router = express.Router();

// 회원가입 / POST
router.post('/register', (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name)
    return res
      .status(400)
      .json({ success: false, msg: '이름을 작성해주세요.' });
  else if (!email)
    return res
      .status(400)
      .json({ success: false, msg: '이메일을 작성해주세요.' });
  else if (!password)
    return res
      .status(400)
      .json({ success: false, msg: '비밀번호를 입력해주세요.' });
  else if (!phone)
    return res
      .status(400)
      .json({ success: false, msg: '휴대폰 번호를 입력해주세요.' });

  UserTmp.findOne({ email }).then((user) => {
    if (user)
      return res
        .status(400)
        .json({ success: false, msg: '이미 존재하는 이메일입니다.' });

    const newUser = new UserTmp({
      name,
      email,
      password,
      phone,
    });

    // 비밀번호 암호화
    // bcrypt 사용한다고 하셔서 bcrypt 이용했고
    // bcrypt는 해쉬 방식 사용

    // genSalt를 이용해 10자리 salt를 만들고
    bcrypt.genSalt(10, (err, salt) => {
      // salt와 입력받은 비밀번호를 이용해 암호화된 hash를 만듦
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) return res.status(400).json({ err });

        newUser.password = hash;
        newUser.save().then((user) => {
          // token 생성을 위해 가장 많이 쓰는 json web token 사용
          jwt.sign(
            { id: user.id },
            JWT_SECRET,
            { expiresIn: 36000 },
            (err, token) => {
              if (err) return res.status(400).json({ err });

              res.json({
                success: true,
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            },
          );
        });
      });
    });
  });
});

// 이메일 로그인 / POST
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email)
    return res
      .status(400)
      .json({ success: false, msg: '이메일을 작성해주세요.' });
  else if (!password)
    return res
      .status(400)
      .json({ success: false, msg: '비밀번호를 작성해주세요.' });

  UserTmp.findOne({ email }).then((user) => {
    if (!user)
      return res
        .status(400)
        .json({ success: false, msg: '이메일을 확인해주세요.' });

    // 암호화 한 패스워드는 절대 복호화되면 안됨
    // 이건 bcrypt 뿐 아니라 어디서든 거의 무조건입니다.
    // 하지만 복호화가 안되기 때문에 받아온 데이터를 다시 암호화해, 암호화되어 있던 데이터와 비교합니다.
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res
          .status(400)
          .json({ success: false, msg: '비밀번호를 확인해주세요.' });

      jwt.sign(
        { id: user.id },
        JWT_SECRET,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) return res.status(400).json({ success: false, msg: err });

          res.json({
            success: true,
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        },
      );
    });
  });
});

module.exports = router;
