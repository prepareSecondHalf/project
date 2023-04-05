import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import MyPageInfo from 'pages/mypage/MyPageInfo';
import MyPageEdit from 'pages/mypage/MyPageInfoEdit';
import MyPageCashHistory from 'pages/mypage/cash';

import { Container, MyPageWrapper, MyPageSideBar, MyPageContent } from 'styles/myPage/myPageStyled';

type menu = {
    key: string,
    title: string,
    href: string,
    slug: string,
    component: JSX.Element,
}

const myPageSideMenu = [
    {
        key: '0',
        title: '내 정보',
        base: '/mypage',
        href: '/mypage',
        component: <MyPageInfo />
    },
    {
        key: '1',
        title: '캐시 충전 내역',
        base: '/mypage',
        href: '/mypage/cash',
        component: <MyPageCashHistory />
    },
    {
        key: '2',
        title: '캐시 사용 내역',
        base: '/mypage',
        href: '/mypage/cash/chargelist',
        component: <MyPageCashHistory />
    },
    {
        key: '3',
        title: '리뷰 신청 내역',
        base: '/mypage',
        href: '/mypage/review/request',
        component: <MyPageInfo />
    },
    {
        key: '4',
        title: '리뷰어 활동 내역',
        base: '/mypage',
        href: '/mypage/review/reviewer',
        component: <MyPageInfo />
    },
    {
        key: '5',
        title: '위시리스트',
        base: '/mypage',
        href: '/mypage/wish',
        component: <MyPageInfo />
    },
];

const MyPage: NextPage = () => {

    const [currentCmp, setCurrentCmp] = useState(<MyPageInfo />)

    const router = useRouter();

    useEffect(() => {
        myPageSideMenu.find((cmp) => {
            if (cmp.href === router.asPath) {
                setCurrentCmp(cmp.component);
            }
        })
    }, [router]);

    return (
        <Container>
            <MyPageWrapper>
                <MyPageSideBar className='rounded-lg'>
                    {
                        myPageSideMenu.map((item) => (
                            <div className="menu-item" key={item.key}>
                                <Link href='/mypage' as={item.href} passHref>
                                    {item.title}
                                </Link>
                            </div>
                        ))
                    }
                </MyPageSideBar>
                <MyPageContent>
                    {currentCmp}
                </MyPageContent>
            </MyPageWrapper>
        </Container>
    )
}

export default MyPage;