const moment = require('moment');
const mongoose = require('mongoose');

const UserTmpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    enum: ['Lv1', 'Lv2', 'Lv3', 'Lv4', 'Lv5'],
    default: 'Lv1',
    required: true,
  },
  point: {
    type: Number,
    required: true,
    default: 0,
  },
  login_way: {
    type: String,
    required: true,
    default: 'email',
  },
  phone: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: moment().format('MMMM DD, YYYY'),
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment',
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'review',
    },
  ],
  lang: [{ type: String, required: true }],
  photo: {
    type: String,
    required: true,
    default: 'https://dummyimage.com/600x400/000000/fff.png', // 변경할거
  },
  chatRoom: { type: mongoose.Schema.Types.ObjectId, ref: 'chatRoom' },
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
  // profile_img랑 photo랑 무슨 차이였지..
  profile_img: {
    type: String,
    default: 'https://dummyimage.com/600x400/000000/fff.png', // 변경할거
  },
});

const UserTmp = mongoose.model('userTmp', UserTmpSchema);

module.exports = { UserTmp };
