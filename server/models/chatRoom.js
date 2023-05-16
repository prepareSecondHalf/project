const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const ChatRoomSchema = new Schema({
  roomId: {
    type: String,
    required: true,
  },
  owner: {
    type: ObjectId,
    required: true,
    ref: 'user',
  },
  users: [
    {
      type: ObjectId,
      required: true,
      ref: 'user',
    },
  ],
  chats: [{ type: ObjectId, ref: 'chat' }],
  createdAt: {
    type: Date,
    required: true,
    default: moment().format('MMMM DD, YYYY'),
  },
});

const ChatRoom = mongoose.model('chatRoom', ChatRoomSchema);

module.exports = { ChatRoom };
