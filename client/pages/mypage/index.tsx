import { NextPage } from 'next';

import MyPageInfo from 'components/MyPage/MyPageInfo';
import SideBar from 'components/MyPage/MyPageSideBar';

import { Container, MyPageWrapper, MyPageContent } from 'styles/myPage/myPageStyled';

const MyPage: NextPage = () => {

    return (
        <Container>
            <MyPageWrapper>
                <SideBar />
                <MyPageContent>
                    <MyPageInfo />
                </MyPageContent>
            </MyPageWrapper>
        </Container>
    )
}

export default MyPage;