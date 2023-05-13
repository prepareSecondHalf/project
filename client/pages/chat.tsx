import { useInput } from 'hooks/useInput';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';

import io from 'socket.io-client';

interface IMessage {
  user: string;
  message: string;
}

const dummyChats = [
  {
    expert: '정환',
    msg: [
      {
        id: 0,
        isMe: false,
        name: '정환',
        msg: '혹시 디자인 파일이 있으실까요?? 디자인 파일 없이 웹사이트 제작은 힘듭니다 ㅠㅠ',
      },
      {
        id: 1,
        isMe: true,
        msg: '앗 아뇨... 디자인 파일이 따로 필요한거였군요 ㅠㅠㅠ... 혹시 아시는 분이 있으실까요??',
      },
      {
        id: 2,
        isMe: true,
        msg: '제가 처음 맡겨보는거라 몰랐네요 ㅠㅠ',
      },
      {
        id: 3,
        isMe: false,
        name: '정환',
        msg: '음... 010-2797-7760 여기로 연락해 보시겠어요?? 디자이너는 아닌데 어깨가 깡패입니다',
      },
      {
        id: 4,
        isMe: true,
        msg: '엇... 그게 무슨 상관인가요 디자인이랑...? 근데 어깨가 깡패라니 좀 설레네요... 혹시 그 분 나이가...',
      },
      {
        id: 5,
        isMe: false,
        name: '정환',
        msg: '?? 소개팅 자리가 아닌데요',
      },
      {
        id: 6,
        isMe: true,
        msg: '?? 아니 그... 그럼 디자인이랑 뭔상관이신 분인가요?',
      },
      {
        id: 7,
        isMe: false,
        name: '정환',
        msg: 'ㅋㅋ 뭔소린지 이게',
      },
    ],
  },
  {
    expert: '희수',
    msg: [
      {
        id: 0,
        isMe: false,
        name: '희수',
        msg: '혹시 디자인 파일이 있으실까요?? 디자인 파일 없이 웹사이트 제작은 힘듭니다 ㅠㅠ',
      },
      {
        id: 1,
        isMe: true,
        msg: '앗 아뇨... 디자인 파일이 따로 필요한거였군요 ㅠㅠㅠ... 혹시 아시는 분이 있으실까요??',
      },
      {
        id: 2,
        isMe: true,
        msg: '제가 처음 맡겨보는거라 몰랐네요 ㅠㅠ',
      },
      {
        id: 3,
        isMe: false,
        name: '희수',
        msg: '음... 010-2797-7760 여기로 연락해 보시겠어요?? 디자이너는 아닌데 어깨가 깡패입니다',
      },
      {
        id: 4,
        isMe: true,
        msg: '엇... 그게 무슨 상관인가요 디자인이랑...? 근데 어깨가 깡패라니 좀 설레네요... 혹시 그 분 나이가...',
      },
      {
        id: 5,
        isMe: false,
        name: '희수',
        msg: '?? 소개팅 자리가 아닌데요',
      },
      {
        id: 6,
        isMe: true,
        msg: '?? 아니 그... 그럼 디자인이랑 뭔상관이신 분인가요?',
      },
      {
        id: 7,
        isMe: false,
        name: '희수',
        msg: 'ㅋㅋ 뭔소린지 이게',
      },
    ],
  },
  {
    expert: '승규',
    msg: [
      {
        id: 0,
        isMe: false,
        name: '승규',
        msg: '혹시 디자인 파일이 있으실까요?? 디자인 파일 없이 웹사이트 제작은 힘듭니다 ㅠㅠ',
      },
      {
        id: 1,
        isMe: true,
        msg: '앗 아뇨... 디자인 파일이 따로 필요한거였군요 ㅠㅠㅠ... 혹시 아시는 분이 있으실까요??',
      },
      {
        id: 2,
        isMe: true,
        msg: '제가 처음 맡겨보는거라 몰랐네요 ㅠㅠ',
      },
      {
        id: 3,
        isMe: false,
        name: '승규',
        msg: '음... 010-2797-7760 여기로 연락해 보시겠어요?? 디자이너는 아닌데 어깨가 깡패입니다',
      },
      {
        id: 4,
        isMe: true,
        msg: '엇... 그게 무슨 상관인가요 디자인이랑...? 근데 어깨가 깡패라니 좀 설레네요... 혹시 그 분 나이가...',
      },
      {
        id: 5,
        isMe: false,
        name: '승규',
        msg: '?? 소개팅 자리가 아닌데요',
      },
      {
        id: 6,
        isMe: true,
        msg: '?? 아니 그... 그럼 디자인이랑 뭔상관이신 분인가요?',
      },
      {
        id: 7,
        isMe: false,
        name: '승규',
        msg: 'ㅋㅋ 뭔소린지 이게',
      },
    ],
  },
];

const dummyChatters = [
  {
    id: 0,
    name: '정환',
    latestChat:
      '혹시 디자인 파일이 있으실까요?? 디자인 파일 없이 웹사이트 제작은 힘듭니다 ㅠㅠ',
  },
  {
    id: 1,
    name: '희수',
    latestChat:
      '혹시 디자인 파일이 있으실까요?? 디자인 파일 없이 웹사이트 제작은 힘듭니다 ㅠㅠ',
  },
  {
    id: 2,
    name: '승규',
    latestChat:
      '혹시 디자인 파일이 있으실까요?? 디자인 파일 없이 웹사이트 제작은 힘듭니다 ㅠㅠ',
  },
];

const Chat: NextPage = () => {
  const [chat, setChat] = useState<IMessage[]>([]);
  const [user, setUser] = useState('645ffc1ce7c43d0391830119');
  const msg = useInput('');

  useEffect((): any => {
    const socketClient = io('http://localhost:8080', {
      path: '/api/chat',
    });
    socketClient.on('connect', () => {
      console.log('SOCKET CONNECTED:::', socketClient.id);

      socketClient.emit('setChat', { userId: user });
    });

    if (socketClient) return () => socketClient.disconnect();
  }, [user]);

  const sendMsg = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const socketClient = io('http://localhost:8080', {
      path: '/api/chat',
    });

    socketClient.emit('sendMsg', msg.value);

    socketClient.on('sendMsg', (res) => {
      console.log('res:::', res);
    });
    // if (msg.value) {
    //   const message: IMessage = {
    //     user: user,
    //     message: msg.value,
    //   };

    //   // 아직 라우터 안만들어서...
    //   const res = await axios.post('/api/chat', message);

    //   console.log('res:::', res);
    // }
  };

  return (
    <div className="w-full min-w-[1200px] flex justify-center">
      <div className="w-[1170px] h-fit my-0 mx-auto mt-32 flex border border-[#e1e1e4]">
        <div className="flex-1 h-[500px] overflow-y-auto bg-[#F5F6FA] relative">
          {dummyChats
            .filter((item) => item.expert === '정환')[0]
            .msg.map((item) => {
              return (
                <div key={item.id} className="w-full h-fit p-4">
                  {item.isMe ? (
                    <div className="w-full flex justify-end">
                      <div className="w-fit max-w-sm h-fit bg-white rounded-lg p-3 border-[#e1e1e4] border">
                        {item.msg}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div>{item.name}</div>
                      <div className="w-fit max-w-sm h-fit bg-white rounded-lg p-3 border-[#e1e1e4] border">
                        {item.msg}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          <div className="sticky bottom-0 left-0 bg-white w-full h-12 border-t border-[#e1e1e4] flex justify-center flex-col px-2">
            <form className="w-full h-8 flex gap-2" onSubmit={sendMsg}>
              <input
                className="flex-1 h-full border border-[#e1e1e4] rounded-md px-3 focus:border-[#e1e1e4] focus:outline-none"
                placeholder="메세지를 입력해주세요."
                {...msg}
              />
              <button className="w-fit h-full bg-basered text-white rounded-md px-4">
                Send
              </button>
            </form>
          </div>
        </div>
        <div className="w-80 border-l border-[#E1E1E4]">
          {dummyChatters.map((item) => {
            return (
              <div
                key={item.id}
                className="w-full p-4 flex gap-3 border-b border-[#e1e1e4] cursor-pointer"
                onClick={() => setUser(item.name)}
              >
                <div className="w-8 flex flex-col justify-center">
                  <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-500">
                    {item.latestChat.length > 22
                      ? item.latestChat.slice(0, 22) + '...'
                      : item.latestChat}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Chat;
