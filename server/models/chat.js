const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
    Types: { ObjectId },
} = Schema;

const ChatSchema = new Schema({
    roomId: { type: String, required: true },
    user: {
        type: ObjectId,
        required: true,
        ref: 'user',
    },
    creator: { type: String, required: true },
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
