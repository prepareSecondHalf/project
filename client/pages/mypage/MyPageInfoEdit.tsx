import { useState } from "react";
import { NextPage } from "next";
import { MyPageActiveHistory } from "styles/myPage/myPageStyled";
// 수정중.
const MyPageInfo: NextPage = () => {

    const [userName, setUserName] = useState<string>('유저 이름')
    const [userNick, setUserNick] = useState<string>('유저 닉네임')
    const [userEmail, setUserEmail] = useState<string>('유저 이메일')
    const [userPhoneNumber, setUserPhoneNumber] = useState<string>('010-1234-1234')
    const [userLevel, setUserLevel] = useState<string>('새싹')
    const [userReviewer, setUserReviewer] = useState<boolean>(true)

    return (
        <>
            <div className="profile rounded-full"></div>
            <p className="user-name">{userNick}
                <span>{userLevel}</span>
            </p>
            <div className="user-info grid grid-cols-2 gap-x-16 gap-y-8">
                <div>
                    <span className="field-label">이름</span>
                    <input type="text" readOnly value={userName}/>
                </div>
                <div>
                    <span className="field-label">이메일</span>
                    <input type="text" readOnly value={userEmail} />
                </div>
                <div>
                    <span className="field-label">전화번호</span>
                    <input type="text" className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500" readOnly value={userPhoneNumber} />
                </div>
                <div>
                    <span className="field-label">리뷰어 신청 여부</span>
                    <input type="checkbox" readOnly checked={userReviewer} />
                </div>
                <MyPageActiveHistory className="rounded-md">
                    <p className="category-title">리뷰 신청내역</p>
                    <div className="category-item">X</div>
                </MyPageActiveHistory>
                <MyPageActiveHistory className="rounded-md">
                    <p className="category-title">리뷰어 활동내역</p>
                    <div className="category-item">X</div>
                </MyPageActiveHistory>
                <MyPageActiveHistory className="rounded-md">
                    <p className="category-title">위시리스트</p>
                    <div className="category-item">X</div>
                </MyPageActiveHistory>
                <MyPageActiveHistory className="rounded-md">
                    <p className="category-title" data-category="cookie">
                        쿠키
                        <span>
                            <button className="w-[100px] bg-basered border-none outline-none rounded-3 text-white font-roboto cursor-pointer hover:bg-hoverred">충전하기</button>
                        </span>
                    </p>
                    <div className="category-item">0</div>
                </MyPageActiveHistory>
            </div>
        </>
    )
}

export default MyPageInfo;