import { NextPage } from 'next';
import Link from 'next/link';

import MyPageInfo from 'components/MyPage/MyPageInfo';

import { Container, MyPageWrapper, MyPageSideBar, MyPageContent } from 'styles/myPage/myPageStyled';

const myPageSideMenu = [
    {
        key: '0',
        title: '내 정보',
        href: '/mypage'
    },
    {
        key: '1',
        title: '캐시 충전 내역',
        href: '/mypage'
    },
    {
        key: '2',
        title: '캐시 사용 내역',
        href: '/mypage'
    },
    {
        key: '3',
        title: '리뷰 신청 내역',
        href: '/mypage'
    },
    {
        key: '4',
        title: '리뷰어 활동 내역',
        href: '/mypage'
    },
    {
        key: '5',
        title: '위시리스트',
        href: '/mypage'
    },
]

const myPage: NextPage = () => {

    return (
        <Container>
            <MyPageWrapper>
                <MyPageSideBar className='rounded-lg'>
                    {
                        myPageSideMenu.map((item) => (
                            <div className="menu-item" key={item.key}>
                                <Link href={item.href}>
                                    {item.title}
                                </Link>
                            </div>
                        ))
                    }
                </MyPageSideBar>
                <MyPageContent>
                    <MyPageInfo />
                </MyPageContent>
            </MyPageWrapper>
        </Container>
    )
}

export default myPage;