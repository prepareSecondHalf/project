import { useState, useEffect, useRef } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

import { FixedSizeList } from 'react-window';
import { renderToString } from 'react-dom/server';

import Payment from "components/Payment/Payment";
import { Iamport, RequestPayParams, RequestPayResponse } from '../../interface/IFcPayment';

import { MyPageActiveHistory } from "styles/myPage/myPageStyled";
import { IFcMyInformation, IFcMyRequestHistory, IFcMyActivityHistory, IFcWishList } from 'interface/MyPage/IFcMyPageInfo';
import Charge from "pages/payment/charge";

declare global {
    interface Window {
      IMP?: Iamport
    }
}

const initialData: IFcMyInformation = {
    name: '윤제혁',
    nick: '팀장(닉)',
    email: 'test@test.com',
    phoneNumber: '010-1234-1234',
    level: '고수',
    reviewer: false,
    cookie: 0,
}

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

interface PaymentProps {
    index: number;
    style: React.CSSProperties;
  }

const MyPageInfo: NextPage = () => {

    const [myInfo, setMyInfo] = useState<IFcMyInformation>(initialData);

    const [userRequestReview, setUserRequestReview] = useState<IFcMyRequestHistory[]>(initialRHData);
    const [userActivityHistory, setUseActivityHistory] = useState<IFcMyActivityHistory[]>(initialAHDAta);
    const [userWishList, setUseWishList] = useState<IFcWishList[]>(initialWLData);
    const [isPayment, setIsPayment] = useState<boolean>(false);

    const router = useRouter();
    useEffect(() => {
        window.addEventListener('message', (e: MessageEvent) => {
            const { data } = e;
            
            // console.log(data, " : data get");
            // initialData.cookie = data.paid_amount;
            // setMyInfo(initialData);
        })
        
    }, [])

    // const openPaymentWindow = async (params: RequestPayParams) => {
    //     // const { IMP } = window;
    //     // IMP?.init('imp23735785');
      
    //     // const { pg, pay_method, merchant_uid, amount, name, buyer_email, buyer_name, buyer_tel, buyer_addr, buyer_postcode } = params;
    //     // const url = `/payment/charge?merchant_uid=${merchant_uid}&amount=${amount}&buyer_name=${buyer_name}&buyer_tel=${buyer_tel}`;
    //     // const list = (
    //     //     <FixedSizeList height={800} width={900} itemSize={100} itemCount={10}>
    //     //         {({ index, style }: PaymentProps) => <Charge />}
    //     //     </FixedSizeList>
    //     // )
    //     // const html = renderToString(list)
    //     // window.open(url, '_blank', 'width=900, height=800');
    //     // window.open(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`, '_blank');
    //     // const containerRef = useRef<HTMLDivElement | null>(null);
    //     return (<Charge />)
    // };

    return (
        <>
            <div className="profile-base">
                <div className="profile-box">
                    <div className="profile rounded-full">

                    </div>
                    <p className="user-name">
                        {myInfo.nick}
                        <span>{myInfo.level}</span>
                    </p>
                </div>
                <div className="user-info grid grid-cols-2 gap-x-16 gap-y-8">
                    <div>
                        <span className="field-label">이름</span>
                        <input type="text" readOnly value={myInfo.name}/>
                    </div>
                    <div>
                        <span className="field-label">이메일</span>
                        <input type="text" readOnly value={myInfo.email} />
                    </div>
                    <div>
                        <span className="field-label">전화번호</span>
                        <input type="text" className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500" readOnly value={myInfo.phoneNumber} />
                    </div>
                    <div>
                        <span className="field-label">리뷰어 신청 여부</span>
                        <input type="checkbox" readOnly checked={myInfo.reviewer} />
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
                    <div className="category-item" data-category="cookie">{myInfo.cookie}</div>
                </MyPageActiveHistory>
            </div>
        </>
    )
}

export default MyPageInfo;