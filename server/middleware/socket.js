const SocketIO = require('socket.io');
const { Chat } = require('../models/chat');
const { ChatRoom } = require('../models/chatRoom');
const moment = require('moment');

module.exports = (server) => {
    const io = SocketIO(server, {
        path: '/api/chat',
        cors: { origin: '*', methods: ['GET', 'POST'] },
    });

    const userList = [];

    io.on('connection', (socket) => {
        let userId = '';

        const req = socket.request;
        const ip =
            req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        socket.on('getAllChatRoom', (info) => {
            ChatRoom.find({ users: info.userId })
                .populate('chats')
                .then((rooms) => {
                    if (!rooms)
                        io.emit('getAllChatRoom', {
                            success: false,
                            msg: 'noRoom',
                        });
                    else
                        io.emit('getAllChatRoom', {
                            success: true,
                            rooms: rooms.map((item) => {
                                return {
                                    roomId: item.roomId,
                                    owner: item.owner,
                                    chats: item.chats,
                                };
                            }),
                        });
                });
        });

        socket.on('createChat', (info) => {
            const newChatRoom = new ChatRoom({
                roomId: info.userId + moment().format('YYYYMMDDhhmmss'),
                owner: info.userId,
                users: [info.userId, info.opponentUserId],
            });
            newChatRoom.save();

            io.emit('createChat', info);
        });

        socket.on('enterChat', (info) => {
            ChatRoom.findOne({ roomId: info.roomId }).then((room) => {
                if (room) console.log(`${socket.id} Room Connected`);
                else console.log('Error::: No Chat Room');
            });

            io.emit('enterChat', info);
        });

        socket.on('disconnect', () => {
            socket.leave(userId);

            io.emit('getUserList', userList);
        });

        socket.on('error', (err) => {
            console.error(err);
        });

        socket.on('sendMsg', async (info) => {
            const newChat = new Chat({
                roomId: info.roomId,
                user: info.userId,
                message: info.msg,
            });
            newChat.save();

            console.log('here');

            await ChatRoom.findOneAndUpdate(
                { roomId: info.roomId },
                {
                    $push: {
                        chats: { _id: newChat._id },
                    },
                },
            );
            console.log('here2');

            io.emit('sendMsg', newChat);
        });
    });
};
