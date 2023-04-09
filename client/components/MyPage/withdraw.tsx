import { NextPage } from "next";
import SideBar from 'components/MyPage/MyPageSideBar';

import { Container, MyPageWrapper, MyPageContent } from 'styles/myPage/myPageStyled';

const Withdraw: NextPage = () => {

    return (
        <>
            <Container>
                <MyPageWrapper>
                    <MyPageContent>
                        회원탈퇴
                    </MyPageContent>
                </MyPageWrapper>
            </Container>
        </>
    )
}

export default Withdraw;