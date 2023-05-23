import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from "next/router";
import { useQuery, useMutation } from 'react-query';

// Util
import { Apis } from 'utils/api';
import { setAuthToken, setHeaderAuth } from 'utils/loginAuth';

// Component
import MyPageInfo from 'components/MyPage/MyPageInfo';
import SideBar from 'components/MyPage/MyPageSideBar';

import { Container, MyPageWrapper, MyPageContent } from 'styles/myPage/myPageStyled';

type loginParam = {
    email: string,
    password: string,
}

const login = async (user: loginParam) => {
    try {
        const res = await Apis.post('/user-tmp/login', { email: user.email, password: user.password });
        console.warn("infomation : ", res);
        return res;
    } catch(err) {
        console.error(err, " : Login Error !!!");
    }
}

const getProfile = async () => {
    try {
        setAuthToken(window.localStorage.getItem("token") as string);
        setHeaderAuth();
        const res = await Apis.get('/user-tmp/myprofile');
        
        return res;
    } catch(err) {
        console.error(err, " : Profile get Error!!!");
    }
}

const MyPage: NextPage = () => {

    const loginMutation = useMutation(login);
    const { data, isError } = useQuery('getProfile', getProfile);

    useEffect(() => {
        if (typeof window !== undefined && !window.localStorage.getItem("token")) {
            alert("로그인을 시작합니다. (계정 : test@test.com)");
            loginMutation.mutate({ email: 'test@test.com', password: 'password123' });
        }
    }, []);

    if (loginMutation.isSuccess) {
        localStorage.setItem("token", loginMutation.data.token);
    }

    const handleLogin = () => {
        loginMutation.mutate({ email: 'test@test.com', password: 'password123' });
    }

    return (
        <Container>
            <MyPageWrapper>
                <SideBar />
                <MyPageContent>
                    <MyPageInfo />
                    <button onClick={handleLogin}>123</button>
                </MyPageContent>
            </MyPageWrapper>
        </Container>
    )
}

export default MyPage;