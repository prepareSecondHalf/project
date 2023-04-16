const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const ChatSchema = new Schema({
  user: {
    type: ObjectId,
    required: true,
    ref: 'user',
  },
  toUser: {
    type: ObjectId,
    ref: 'user',
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Chat = mongoose.model('chat', ChatSchema);

module.exports = { Chat };
