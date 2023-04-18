import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

// import Component
import SideBar from 'components/MyPage/MyPageSideBar';
import CashUsageHistory from "components/MyPage/CashUsageHistory";
import CashChargeHistory from "components/MyPage/CashChargeHistory";
import Withdraw from "components/MyPage/withdraw";
import MyPageInfo from "./MyPageInfoEdit";

// import Styled
import { Container, MyPageWrapper, MyPageContent } from 'styles/myPage/myPageStyled';

const menus = [
    {
        key: '0',
        title: '내 정보',
        dir: '/mypage',
        cmp: <MyPageInfo />,
    },
    {
        key: '1',
        title: '캐시 충전 내역',
        dir: ['cash'],
        cmp: <CashChargeHistory />,
    },
    {
        key: '2',
        title: '캐시 사용 내역',
        dir: ['cash', 'chargelist'],
        cmp: <CashUsageHistory />,
    },
    {
        key: '3',
        title: '리뷰 신청 내역',
        dir: ['review', 'request'],
        cmp: <CashUsageHistory />,
    },
    {
        key: '4',
        title: '리뷰어 활동 내역',
        dir: ['review', 'reviewer'],
        cmp: <CashUsageHistory />,
    },
    {
        key: '5',
        title: '위시리스트',
        dir: ['wish'],
        cmp: <CashUsageHistory />,
    },
    {
        key: '6',
        title: '회원탈퇴',
        dir: ['withdraw'],
        cmp: <Withdraw />,
    },
];

const Dir: NextPage = () => {

    const [title, setTitle] = useState<string>();
    const [currentCmp, setCurrentCmp] = useState<JSX.Element>();

    const router = useRouter();

    useEffect(() => {
        menus.forEach(item => {
            if (JSON.stringify(item.dir) === JSON.stringify(router.query.dir)) {
                setTitle(item.title);
                setCurrentCmp(item.cmp);
            }
        })
    }, [router])

    return (
        <>
            <Container>
                <MyPageWrapper>
                    <SideBar />
                    <MyPageContent>
                        <h2 className="text-2xl font-semibold leading-tight">
                            {title}
                        </h2>
                        {currentCmp}
                    </MyPageContent>
                </MyPageWrapper>
            </Container>
        </>
    )
}

export default Dir;