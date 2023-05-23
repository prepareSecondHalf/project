import { useState, useEffect, useRef } from "react";
import { NextPage } from "next";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import Link from "next/link";

import { MyPageActiveHistory } from "styles/myPage/myPageStyled";
import { IFcMyInformation, IFcMyRequestHistory, IFcMyActivityHistory, IFcWishList } from 'interface/MyPage/IFcMyPageInfo';

// Util
import { setAuthToken, setHeaderAuth, removeAuthToken } from "utils/loginAuth";
import { Apis } from "utils/api";
import axios, { AxiosError } from "axios";

const initialRHData: IFcMyRequestHistory[] = [
    {
        title: '리뷰 신청 내역 제목',
    },
    {
        title: '리뷰 신청 내역 2',
    },
];

const initialAHDAta: IFcMyActivityHistory[] = [
    {
        title: '리뷰어 활동 내역1',
    },
    {
        title: '리뷰어 활동 내역2',
    },
    {
        title: '리뷰어 활동 내역3',
    },
    {
        title: '리뷰어 활동 내역4',
    },
    {
        title: '리뷰어 활동 내역5',
    },
];

const initialWLData: IFcWishList[] = [
    
];

const getProfile = async () => {
    if (typeof window !== undefined) {
        if (window.localStorage.getItem("token")) {
            setAuthToken(window.localStorage.getItem("token") as string);
            setHeaderAuth();
            const res = await Apis.get('/user-tmp/myprofile');
            
            return res.user;
        }
        // try {
        // } catch(err) {
            
        // }
    }
}

const MyPageInfo: NextPage = () => {

    const { data, isSuccess, error } = useQuery<IFcMyInformation, AxiosError>(['getProfile'], () => getProfile(), {
        cacheTime: Infinity,
        staleTime: 3600,
        onError: (err) => {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 403) {
                    alert('시간이 만료되어 로그아웃 되었습니다. 다시 로그인 해주세요.')
                    removeAuthToken(window.localStorage.getItem("token") as string);
                } else {
                    console.error(err, " : Profile get Error!!!");
                }
            }
        }
    });

    const [userRequestReview, setUserRequestReview] = useState<IFcMyRequestHistory[]>(initialRHData);
    const [userActivityHistory, setUseActivityHistory] = useState<IFcMyActivityHistory[]>(initialAHDAta);
    const [userWishList, setUseWishList] = useState<IFcWishList[]>(initialWLData);

    return (
        <>
            {
                isSuccess && data?(
                    <>
                        <div className="profile-base">
                            <div className="profile-box">
                                <div className="profile rounded-full">
                                    <img src={data.photo} alt="Profile Image" />
                                </div>
                                <p className="user-name">
                                    {data.nickname}
                                    <span>{data.grade}</span>
                                </p>
                            </div>
                            <div className="user-info grid grid-cols-2 gap-x-16 gap-y-8">
                                <div>
                                    <span className="field-label">이름</span>
                                    <input type="text" readOnly value={data.name}/>
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
                                    <span className="field-label">리뷰어 신청 여부</span>
                                    <input type="checkbox" readOnly checked={data.isSubmit} />
                                </div>
                            </div>
                        </div>
                        <div className="user-info grid grid-cols-2 gap-x-16 gap-y-8">
                            <MyPageActiveHistory className="rounded-md">
                                <p className="category-title">리뷰 신청내역</p>
                                <div className={'category-list ' + (userRequestReview.length > 0?'':'no-data')}>
                                    {
                                        userRequestReview.length > 0 ? userRequestReview.map(item => (
                                            <p key={item.title} className="category-item">
                                                <Link href="/mypage">
                                                    {item.title}
                                                </Link>
                                            </p>
                                        )) : '리뷰 신청 내역이 없습니다.'
                                    }
                                </div>
                            </MyPageActiveHistory>
                            <MyPageActiveHistory className="rounded-md">
                                <p className="category-title">리뷰어 활동내역</p>
                                <div className={'category-list ' + (userActivityHistory.length > 0?'':'no-data')}>
                                    {
                                    userActivityHistory.length > 0 ?  userActivityHistory.map(item => (
                                            <p key={item.title} className="category-item">
                                                <Link href="/mypage">
                                                    {item.title}
                                                </Link>
                                            </p>
                                        )) : '리뷰어 활동 내역이 없습니다.'
                                    }
                                </div>
                            </MyPageActiveHistory>
                            {/* <MyPageActiveHistory className="rounded-md">
                                <p className="category-title">위시리스트</p>
                                <div className={'category-list ' + (userWishList.length > 0?'':'no-data')}>
                                    {
                                        userWishList.length > 0 ? userWishList.map(item => (
                                            <p key={item.title} className="category-item">
                                                <Link href="/mypage">
                                                    {item.title}
                                                </Link>
                                            </p>
                                        )) : '위시리스트가 존재하지 않습니다.'
                                    }
                                </div>
                            </MyPageActiveHistory> */}
                            <MyPageActiveHistory className="rounded-md">
                                <p className="category-title" data-category="cookie">
                                    <span>
                                        쿠키
                                    </span>
                                    <button className="w-[100px] bg-basered border-none outline-none rounded-3 text-white font-roboto cursor-pointer hover:bg-hoverred"
                                        // onClick={onPayment}>
                                        >
                                        <Link href="/payment/charge">충전하기</Link>
                                    </button>
                                </p>
                                <div className="category-item" data-category="cookie">{data.point}</div>
                            </MyPageActiveHistory>
                        </div>
                    </>
                ): <></>
            }
        </>
    )
}

export default MyPageInfo;