import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { MyPageActiveHistory } from "styles/myPage/myPageStyled";
import { IFcMyInformation, IFcMyRequestHistory, IFcMyActivityHistory, IFcWishList } from 'interface/MyPage/IFcMyPageInfo';

// Util
import { setAuthToken, setHeaderAuth, removeAuthToken } from "utils/loginAuth";
import { Apis } from "utils/api";
import axios, { AxiosError } from "axios";

const getProfile = async () => {
    if (typeof window !== undefined) {
        if (window.localStorage.getItem("token")) {
            setAuthToken(window.localStorage.getItem("token") as string);
            setHeaderAuth();

            const res = await Apis.get('/user-tmp/myprofile');

            return res.user;
        }
    }
}

const MyPageInfo: NextPage = () => {
    const router = useRouter();

    const [token, setToken] = useState<string>("");

    const { data, isSuccess, error, isError } = useQuery<IFcMyInformation, AxiosError>(['getProfile'], getProfile, {
        cacheTime: 1800,
        staleTime: 3600,
        keepPreviousData: true,
        retry: 1,
    });

    if (isError) {
        if (axios.isAxiosError(error) && error as Error) {
            // if (error.response && error.response.status === 403 && token) {
                alert('시간이 만료되어 로그아웃 되었습니다. 다시 로그인 해주세요.');
                removeAuthToken(token);
                if (typeof window !== undefined) window.location.reload();
            // } else {
            //     console.error(error, " : Profile get Error!!!");
            // }
        } else {
            console.warn(error, " : !!!!")
        }
    }

    useEffect(() => {
        const checkLoginStatus = () => {
            (typeof window !== 'undefined' && window.localStorage.getItem('token')) ?? setToken("");
        };

        checkLoginStatus();

        window.addEventListener('storage', checkLoginStatus);

        // return () => {
        //     window.removeEventListener('storage', checkLoginStatus);
        // };
    }, []);


    return (
        <>
            {
                isSuccess && data ? (
                    <>
                        <div className="profile-base">
                            <div className="profile-box">
                                <div className="profile rounded-full">
                                    {/* <Image src={data.photo} alt="Profile Image" width={120} height={120} /> */}
                                    <Image src="https://dummyimage.com/600x400/000000/fff.png" alt="Profile Image" width={120} height={120} />
                                </div>
                                <p className="user-name">
                                    {data.nickname}
                                    <span>{data.grade}</span>
                                </p>
                            </div>
                            <div className="user-info grid grid-cols-2 gap-x-16 gap-y-8">
                                <div>
                                    <span className="field-label">이름</span>
                                    <input type="text" readOnly value={data.name} />
                                </div>
                                <div>
                                    <span className="field-label">이메일</span>
                                    <input type="text" readOnly value={data.email} />
                                </div>
                                <div>
                                    <span className="field-label">전화번호</span>
                                    <input type="text" className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500" readOnly value={data.phone} />
                                </div>
                                <div>
                                    <span className="field-label">스택</span>
                                    <input type="text" className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500" readOnly value={data.lang} />
                                </div>
                                <div>
                                    <span className="field-label">평점</span>
                                    <input type="text" className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500" readOnly value={data.reputation} />
                                </div>
                                <div>
                                    <span className="field-label">리뷰어 신청 여부</span>
                                    <input type="checkbox" readOnly checked={data.isSubmit} />
                                </div>
                                <div className="point-box">
                                    <span className="field-label">Point</span>
                                    <span>{data.point} 포인트 </span>
                                    <button className="w-[100px] bg-basered border-none outline-none rounded-3 text-white font-roboto cursor-pointer hover:bg-hoverred"
                                    >
                                        <Link href="/payment/charge">충전하기</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : <></>
            }
        </>
    )
}

export default MyPageInfo;