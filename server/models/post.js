const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  contents: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    required: true,
  },
  lang: {
    type: [String],
    required: true,
  },
  per_minute: {
    type: Number,
    required: true,
  },
  comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comment',
    required: false,
  },
  creator: {
    type: String,
    required: true,
  },
  // creator: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'user',
  //   required: true,
  // },
});

const Post = mongoose.model('post', PostSchema);

module.exports = { Post };
