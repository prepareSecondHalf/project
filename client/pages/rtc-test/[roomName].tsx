import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useRouter } from 'next/router';

// PeerA = 먼저 룸에 들어와있는 상태
// PeerB = 이후에 룸에 접속을 할 상태

// PeerA
// 1. 브라우저에서 미디어 스트림을 받는다 (getUserMedia)
// 2. stream을 등록한다. (addStream, addTrack)
// 3. createOffer 후에 local sdp를 설정한다. (createOffer => setLocalDescription)
// 4. PeerB에 offer를 전달한다. (send offer)

// PeerB에서 offer를 받은 이후

// PeerB
// 1. PeerA에게서 받은 offer(sdp)로 remote sdp를 설정한다. (setRemoteDescription)
// 2. 브라우저 미디어 스트림을 받는다. (getUserMedia)
// 3. createAnswer 이후 local sdp를 설정한다. (createAnswer => setLocalDescription)
// 4. PeerA에게 answer를 보낸다. (send answer)
// 5. PeerA에서는 answer를 전달받고 remote sdp를 설정한다 (setRemoteDescription)

// create answer 과정 이후 icecandidate로 네트워크 정보를 교환한다.

// 1. 요청자에게 candidate륿 보낸다.
// 2. 연결할 peer에서 받은 정보를 저장하고 자신의 candidate를 보내고(send candidate)
// 3. 받는 쪽에서 해당 candidate를 저장한다. (addICECandidate)
const RTCTest = () => {
    const router = useRouter();

    // Socket 정보를 담을 Ref
    const socketRef = useRef<Socket>();
    // 자신의 비디오
    const myVideoRef = useRef<HTMLVideoElement>(null);
    // 다른 사람의 비디오
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    // peerConnection
    const pcRef = useRef<RTCPeerConnection>();

    // url 파라미터에 있는 room 정보
    const roomName = router.query.props;

    const getMedia = async () => {
        try {
            // 자신의 스트림 정보
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false,
            });

            if (myVideoRef.current) {
                myVideoRef.current.srcObject = stream;
            }
            if (!(pcRef.current && socketRef.current)) {
                return;
            }

            // 스트림을 peerConnection에 등록
            stream.getTracks().forEach((track) => {
                if (!pcRef.current) {
                    return;
                }
                pcRef.current.addTrack(track, stream);
            });

            // iceCandidate 이벤트
            pcRef.current.onicecandidate = (e) => {
                if (e.candidate) {
                    if (!socketRef.current) {
                        return;
                    }
                    console.log('recv candidate');
                    socketRef.current.emit('candidate', e.candidate, roomName);
                }
            };

            // 구 addStream 현 track 이벤트
            pcRef.current.ontrack = (e) => {
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = e.streams[0];
                }
            };
        } catch (e) {
            console.error(e);
        }
    };

    const createOffer = async () => {
        console.log('create Offer');
        if (!(pcRef.current && socketRef.current)) {
            return;
        }
        try {
            // offer 생성
            const sdp = await pcRef.current.createOffer();
            // 자신의 sdp로 localDescription 설정
            pcRef.current.setLocalDescription(sdp);
            console.log('sent the offer');

            // offer 전달
            socketRef.current.emit('offer', sdp, roomName);
        } catch (e) {
            console.error(e);
        }
    };

    const createAnswer = async (sdp: RTCSessionDescription) => {
        // sdp인자 : PeerA 에게서 받은 offer
        console.log('createAnswer');
        if (!(pcRef.current && socketRef.current)) {
            return;
        }

        try {
            // sdp를 remoteDescription에 등록
            pcRef.current.setRemoteDescription(sdp);
            // answer 생성
            const answerSdp = await pcRef.current.createAnswer();
            // answer를 localDescription에 등록 (PeerB 기준)
            pcRef.current.setLocalDescription(answerSdp);

            console.log('sent the answer');
            socketRef.current.emit('answer', answerSdp, roomName);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        socketRef.current = io('localhost:8080', {
            path: '/api/video',
        });

        pcRef.current = new RTCPeerConnection({
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302',
                },
            ],
        });

        // 기존 유저가 있고, 새로운 유저가 들어왔다면 오퍼 생성
        socketRef.current.on('all_users', (allUsers: Array<{ id: string }>) => {
            if (allUsers.length > 0) {
                createOffer();
            }
        });

        // 오퍼를 전달받은 PeerB만 사용할 함수
        // offer를 들고 만들어준 answer 함수 실행
        socketRef.current.on('getOffer', (sdp: RTCSessionDescription) => {
            console.log('recv Offer');
            createAnswer(sdp);
        });

        // answer를 전달받을 PeerA만 사용할 함수
        // answer를 전달받아 PeerA의 RemoteDescription에 등록
        socketRef.current.on('getAnswer', (sdp: RTCSessionDescription) => {
            console.log('recv Answer');
            if (!pcRef.current) {
                return;
            }
            pcRef.current.setRemoteDescription(sdp);
        });

        // 서로의 candidate를 전달받아 등록
        socketRef.current.on(
            'getCandidate',
            async (candidate: RTCIceCandidate) => {
                if (!pcRef.current) {
                    return;
                }

                await pcRef.current.addIceCandidate(candidate);
            },
        );

        // 마운트 시, 해당 방의 roomName을 서버에 전달
        socketRef.current.emit('join_room', {
            room: roomName,
        });

        getMedia();

        return () => {
            // 언마운트 시 socket disconnect
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
            if (pcRef.current) {
                pcRef.current.close();
            }
        };
    }, []);

    return (
        <div className="w-full py-20 px-32 flex justify-center">
            <div className="w-full flex justify-between gap-4">
                <video
                    id="remotevideo"
                    className="bg-black w-1/2 h-96"
                    ref={myVideoRef}
                    autoPlay
                />
                <video
                    id="remotevideo"
                    className="bg-black w-1/2 h-96"
                    ref={remoteVideoRef}
                    autoPlay
                />
            </div>
        </div>
    );
};

export default RTCTest;
