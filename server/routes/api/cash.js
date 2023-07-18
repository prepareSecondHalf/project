const express = require('express');
const { Charge, Used } = require('../../models/cash');
const { UserTmp } = require('../../models/userTmp');

const router = express.Router();

// 캐시충전내역 저장
router.post('/charge', async (req, res) => {
    const { userid, amount } = req.body;

    if (!userid) {
        return res.status(400).json({ success: false, msg: '로그인 후 이용하실 수 있습니다.' });
    } else {
        console.log("conditional charge is in?")
        const updateQuery = { $inc: { point: amount } };
        const option = { returnOriginal: false };
        try {
            UserTmp.findOneAndUpdate({ _id: userid }, updateQuery, option).then(updateUser => {
                console.log(updateUser)

                const chargeHisrtory = new Charge({ user: userid, amount: amount, chargedAt: new Date() });
                chargeHisrtory.save().then(res => {
                    return res.json({
                        success: true,
                        message: '충전이 완료되었습니다.',
                    })
                }).catch(err => {
                    return res.json({
                        success: false,
                        message: '충전을 실패했습니다.',
                        errMsg: err
                    })
                })
            });
        } catch (err) {
            if (err) {
                console.error(err, " : err");
                return res.json({ success: false, message: err });
            }
        }
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

module.exports = router;