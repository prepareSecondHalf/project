const SocketIO = require('socket.io');

module.exports = (server) => {
  const io = SocketIO(server, {
    path: '/routes/api/socketio',
    cors: { origin: '*', methods: ['GET', 'POST'] },
  });

  const userList = [];

  io.on('connection', (socket) => {
    let userId = '';

    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    console.log('new Connection:::', ip, socket.id);

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

    socket.on('toMessage', (obj) => {
      if (obj.toUser) {
        io.to(obj.toSocketId).emit('fromMessage', obj);
        io.to(socket.id).emit('fromMessage', obj);
      } else {
        io.emit('fromMessage', obj);
      }
    });

    socket.on('joinChat', (info) => {
      userId = info.name;
      info.socketId = socket.id;
      userList.push(info);

      socket.join(info.name);

      io.emit('getUserList', userList);
    });
  });
};
