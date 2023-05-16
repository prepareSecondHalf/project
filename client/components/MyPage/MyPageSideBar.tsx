import { NextPage } from "next";
import Link from "next/link";

import { Container, MyPageWrapper, MyPageSideBar, MyPageContent } from 'styles/myPage/myPageStyled';

const myPageSideMenu = [
    {
        key: '0',
        title: '내 정보',
        base: '/mypage',
        href: '/mypage',
    },
    {
        key: '1',
        title: '캐시 충전 내역',
        base: '/mypage',
        href: '/mypage/cash',
    },
    {
        key: '2',
        title: '캐시 사용 내역',
        base: '/mypage',
        href: '/mypage/cash/chargelist',
    },
    {
        key: '3',
        title: '리뷰 신청 내역',
        base: '/mypage',
        href: '/mypage/review/request',
    },
    {
        key: '4',
        title: '리뷰어 활동 내역',
        base: '/mypage',
        href: '/mypage/review/reviewer',
    },
    {
        key: '5',
        title: '위시리스트',
        base: '/mypage',
        href: '/mypage/wish',
    },
    {
        key: '6',
        title: '회원탈퇴',
        base: '/mypage',
        href: '/mypage/withdraw',
    },
];

const SideBar: NextPage = () => {

    return (
        <>
            <MyPageSideBar className='rounded-lg'>
                {
                    myPageSideMenu.map((item) => (
                        <Link href={item.href} passHref className="menu-item" key={item.key}>
                            {item.title}
                        </Link>
                    ))
                }
            </MyPageSideBar>
        </>
    )
}

export default SideBar;