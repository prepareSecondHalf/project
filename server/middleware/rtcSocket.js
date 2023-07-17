const SocketIO = require('socket.io');

module.exports = (server) => {
    const io = SocketIO(server, {
        path: '/api/video',
        cors: { origin: '*', methods: ['GET', 'POST'] },
    });

    // 어떤 방에 어떤 유저가 있는지
    const users = {};
    // socket.io 기준으로 어떤 방에 들어있는지
    const socketRoom = {};

    io.on('connection', (socket) => {
        console.log('Connection:::', socket.id);

        socket.on('join_room', (data) => {
            // 방이 기존에 생성되어 있다면
            if (users[data.room]) {
                // 현재 입장하려는 방에 있는 인원수
                const currentRoomLen = users[data.room].length;
                if (currentRoomLen === 2) {
                    socket.io(socket.id).emit('room_full');

                    return;
                }

                // 여분 자리가 있으면 해당 방 배열에 추가
                users[data.room] = [...users[data.room], { id: socket.id }];
            } else {
                users[data.room] = [{ id: socket.id }];
            }

            socketRoom[socket.id] = data.room;

            // 입장
            socket.join(data.room);

            // 입장 전 해당 방의 다른 유저들이 있는지 확인하고
            const others = users[data.room].filter(
                (user) => user.id !== socket.id,
            );
            // 이건 고봉훈 과장님 파트에서도 봤는데 length 가지고도 할 수 있는게
            // length가 0이면 false니까... 미친 javascript
            if (others.length) {
                // 있으면 offer-answer 를 위해 사람 있다고 알려준다.
                io.sockets.to(socket.id).emit('all_users', others);
            }
        });

        // offer를 전달받고 다른 유저들에게 전달
        socket.on('offer', (sdp, roomName) => {
            socket.to(roomName).emit('getOffer', sdp);
        });

        // answer를 전달받고 방의 다른 유저들에게 전달
        socket.on('answer', (sdp, roomName) => {
            socket.to(roomName).emit('getAnswer', sdp);
        });

        // candidate를 전달받고 방의 다른 유저들에게 전달
        socket.on('candidate', (candidate, roomName) => {
            socket.to(roomName).emit('getCandidate', candidate);
        });

        // 방 나갈 때 socketRoom, users에서 해당 유저 지워줌
        socket.on('disconnect', () => {
            const roomID = socketRoom[socket.id];

            if (users[roomID]) {
                users[roomID] = users[roomID].filter(
                    (user) => user.id !== socket.id,
                );
                if (users[roomID].length === 0) {
                    delete users[roomID];
                    return;
                }
            }
            delete socketRoom[socket.id];
            socket.broadcast
                .to(users[roomID])
                .emit('user_exit', { id: socket.id });
        });
    });
};
