const express = require('express');
const { Charge, Used } = require('../../models/cash');
const { UserTmp } = require('../../models/userTmp');

const router = express.Router();

// 캐시충전내역 저장
router.post('/cash/charge', (req, res) => {
    const { userid, amount } = req.body;

    if (!userid) {
        return res.status(400).json({ success: false, msg: '로그인 후 이용하실 수 있습니다.' });
    } else {
        UserTmp.findOne({ userid }).then((user) => {
            if (user) {
                user.amount = amount;
                Charge.create({ userid, amount })
                return user.save();
            } else {
                return res.status(400).json({ success: false, msg: '유저가 존재하지 않습니다.' });
            }
        }).then(savedUser => {
            res.json({ success: true, user: savedUser });
        }).catch(err => {
            console.log(err)
            res.status(500).json({ success: false, msg: err });
        });
    }
});

// 캐시사용내역 저장
router.post('/cash/used', (req, res) => {
    const { userid, amount } = req.body;

    if (!userid) {
        return res.status(400).json({ success: false, msg: '로그인 후 이용하실 수 있습니다.' });
    } else {
        UserTmp.findOne({ userid }).then((user) => {

        });
    }
});

// 캐시충전내역 리스트
router.get('/cash/chargehistory', (req, res) => {
    const { userid } = req.body;

    if (!userid) {
        return res.status(400).json({ success: false, msg: '로그인 후 이용하실 수 있습니다.' });
    } else {
        UserTmp.findOne({ userid }).then((user) => {

        });
    }
});

// 캐시사용내역 리스트
router.post('/cash/usedhistory', (req, res) => {
    const { userid } = req.body;

    if (!userid) {
        return res.status(400).json({ success: false, msg: '로그인 후 이용하실 수 있습니다.' });
    } else {
        UserTmp.findOne({ userid }).then((user) => {

        });
    }
});