const SocketIO = require('socket.io');
const { Chat } = require('../models/chat');
const { ChatRoom } = require('../models/chatRoom');

module.exports = (server) => {
  const io = SocketIO(server, {
    path: '/api/chat',
    cors: { origin: '*', methods: ['GET', 'POST'] },
  });

  const userList = [];

  io.on('connection', (socket) => {
    let userId = '';

    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    socket.on('setChat', (info) => {
      ChatRoom.findOne({ roomId: socket.id }).then((room) => {
        if (room) console.log(`${socket.id} Room Connected`);
        else {
          let users = [];
          users.push(info.userId);

          const newRoom = new ChatRoom({
            roomId: socket.id,
            owner: info.userId,
            users,
          });
          newRoom.save();

          console.log('new Connection:::', ip, socket.id);
        }
      });

      io.emit('setChat', info);
    });

    socket.on('disconnect', () => {
      socket.leave(userId);

      for (let i in userList) {
        if (userList[i].name === userId) userList.splice(i, 1);
      }

      io.emit('getUserList', userList);
    });

    socket.on('error', (err) => {
      console.error(err);
    });

    socket.on('sendMsg', (info) => {
      console.log('socketId:::', socket.id);
      const newChat = new Chat({
        roomId: socket.id,
        user: info.userId,
        message: info.msg,
      });
      newChat.save();

      ChatRoom.findOneAndUpdate(
        { roomId: socket.id },
        {
          $push: {
            chats: newChat._id,
          },
        },
      )
        .then(() => {
          res.status(200).json({ success: true });
        })
        .catch((e) => {
          res.status(400).json({ success: false });
        });

      io.emit('sendMsg', info);
    });
  });
};
