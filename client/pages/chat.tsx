import { useInput } from 'hooks/useInput';
import { NextPage } from 'next';
import { Key, useEffect, useState } from 'react';
import io from 'socket.io-client';

interface IChat {
    _id: Key;
    roomId: String;
    user: String;
    message: String;
    createdAt: Date;
    creator: String;
}
interface IRoom {
    roomId: String;
    owner: String;
    ownername: String;
    chats: IChat[];
}

const Chat: NextPage = () => {
    const [user, setUser] = useState('64604429d2a94b6af3ac6788');
    const [owner, setOwner] = useState('645ffc1ce7c43d0391830119');
    const [chats, setChats] = useState<IChat[]>([]);
    const [rooms, setRooms] = useState<IRoom[]>([]);
    const [roomId, setRoomId] = useState<String>('');
    const msg = useInput('');

    useEffect((): any => {
        const socketClient = io('http://localhost:8080', {
            path: '/api/chat',
        });
        socketClient.on('connect', () => {
            console.log('SOCKET CONNECTED:::', socketClient.id);
        });

        socketClient.emit('getAllChatRoom', { userId: user });
        socketClient.on('getAllChatRoom', (res) => {
            console.log('getAllChatRoomRes:::', res);

            if (res.success) setRooms(res.rooms);
        });

        if (socketClient) return () => socketClient.disconnect();
    }, [owner, user]);

    const createNewChat = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();

        const socketClient = io('http://localhost:8080', {
            path: '/api/chat',
        });

        socketClient.emit('createChat', {
            userId: owner,
            opponentUserId: user,
        });

        socketClient.on('createChat', (res) => {});
    };

    const sendMsg = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const socketClient = io('http://localhost:8080', {
            path: '/api/chat',
        });

        socketClient.emit('sendMsg', {
            roomId,
            userId: user,
            msg: msg.value,
            username: '윤제혁',
        });

        socketClient.on('sendMsg', (res) => {
            console.log('sendMsgRes:::', res);
        });

        msg.resetValue();
    };

    const handleChats = (roomId: String) => {
        setChats(rooms.filter((item) => item.roomId === roomId)[0].chats);

        setRoomId(roomId);
    };

    return (
        <div className="w-full min-w-[1200px] flex justify-center">
            <div className="w-[1170px] h-fit my-0 mx-auto mt-32 flex border border-[#e1e1e4]">
                <div className="flex-1 h-[500px] overflow-y-auto bg-[#F5F6FA] relative">
                    {chats.map((item) => {
                        return (
                            <div
                                key={item._id}
                                className={`w-full h-fit p-4 ${
                                    item.user === user ? 'pt-0' : ''
                                }`}
                            >
                                {item.user === user ? (
                                    <div className="w-full flex justify-end">
                                        <div className="w-fit max-w-sm h-fit bg-white rounded-lg p-3 border-[#e1e1e4] border">
                                            {item.message}
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div>{item.creator}</div>
                                        <div className="w-fit max-w-sm h-fit bg-white rounded-lg p-3 border-[#e1e1e4] border">
                                            {item.message}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    <div className="sticky bottom-0 left-0 bg-white w-full h-12 border-t border-[#e1e1e4] flex justify-center flex-col px-2">
                        <form
                            className="w-full h-8 flex gap-2"
                            onSubmit={sendMsg}
                        >
                            <input
                                className="flex-1 h-full border border-[#e1e1e4] rounded-md px-3 focus:border-[#e1e1e4] focus:outline-none"
                                placeholder="메세지를 입력해주세요."
                                value={msg.value}
                                onChange={msg.onChange}
                            />
                            <button className="w-fit h-full bg-basered text-white rounded-md px-4">
                                Send
                            </button>
                        </form>
                    </div>
                </div>
                <div className="w-80 border-l border-[#E1E1E4]">
                    {rooms.map((item) => {
                        return (
                            <div
                                key={item.roomId as Key}
                                className="w-full p-4 flex gap-3 border-b border-[#e1e1e4] cursor-pointer"
                                onClick={() => handleChats(item.roomId)}
                            >
                                <div className="flex-1">
                                    <div className="font-semibold">
                                        {item.ownername}{' '}
                                        <span className="font-normal text-gray-500 text-sm">
                                            {item.chats[0]?.message}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div onClick={createNewChat}>Create New Chat</div>
        </div>
    );
};

export default Chat;
