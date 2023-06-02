import { useState } from "react";
import { NextPage } from "next";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import Link from "next/link";

import { MyPageActiveHistory } from "styles/myPage/myPageStyled";
import { IFcMyInfoUpdateRequest, IFcMyInfoResponse } from 'interface/MyPage/IFcMyPageInfo';

// Util
import { setAuthToken, setHeaderAuth, removeAuthToken, getToken } from "utils/loginAuth";
import { Apis } from "utils/api";
import axios, { AxiosError } from "axios";

const getProfile = async () => {
    if (typeof window !== undefined) {
        if (window.localStorage.getItem("token")) {
            setAuthToken(window.localStorage.getItem("token") as string);
            setHeaderAuth();

            const res = await Apis.get('/user-tmp/myprofile');
            console.log(res, " :res")
            return res.user;
        }
    }
}

const token = getToken();

const userData: IFcMyInfoUpdateRequest = {
    userid: '',
    nickname: 'testEditSuccesss',
    phone: '01012341234',
    lang: ['react', 'node', 'mongodb', 'express', 'babel', 'next', 'react-query', 'styled-components'],
    photo: 'https://dummyimage.com/600x400/000000/fff.png',
}

const userInfoUpdate = async (userData: IFcMyInfoUpdateRequest) => {
    try {
        const res = await Apis.post('/user-tmp/user/update', { data: userData });
        return res;
    } catch(err) {
        console.error(err, " : Login Error !!!");
    }
}

const MyPageInfo: NextPage = () => {

    const updateMutation = useMutation(userInfoUpdate);

    const [wrapperData, setWrapperData] = useState<IFcMyInfoUpdateRequest>(userData);

    // const { data, isSuccess, error } = useQuery<IFcMyInfoUpdateRequest, AxiosError>(['getProfile'], () => getProfile(), {
    //     cacheTime: Infinity,
    //     staleTime: 3600,
    //     onError: (err: AxiosError) => {
    //         console.log(err, " !!!!")
    //         if (axios.isAxiosError(err)) {
    //             if (err.response?.status === 403 && token) {
    //                 alert('시간이 만료되어 로그아웃 되었습니다. 다시 로그인 해주세요.');
    //                 removeAuthToken(token);
    //                 if (typeof window !== undefined) window.location.reload();
    //             } else {
    //                 console.error(err, " : Profile get Error!!!");
    //             }
    //         }
    //     }
    // });

    const qClient = useQueryClient();
    const data = qClient.getQueryData('getProfile') as IFcMyInfoResponse;

    

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        userData.nickname = e.target.value;
        setWrapperData(userData);
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        userData.phone = e.target.value;
        setWrapperData(userData);
    }

    const onUserInfoEdit = () => {
        if (data) userData.userid = data._id;
        setWrapperData(userData)
        updateMutation.mutate(wrapperData);
    }

    return (
        <>
            { 
                data && token ? 
                <>
                    <div className="">
                        <input type="text" className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500" value={data.phone} onChange={handlePhoneChange}/>
                        <input type="text" className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500" value={data.nickname} onChange={handleNicknameChange}/>
                    </div>
                    <div>
                        <button className="bg-white p-[30px] border contrast-more:border-slate-400 border-slate-200" onClick={onUserInfoEdit}>수정하기 버튼입니다 ㅎ.</button>
                    </div>
                </>: <div>
                    <p>!!!{data?.toString()}!!!</p>
                    <p>@@@{token}@@@</p>
                </div>
            }
        </>
    )
}

export default MyPageInfo;