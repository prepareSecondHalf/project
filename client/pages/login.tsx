import { NextPage } from "next";
import { BaseSyntheticEvent, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { isError, useMutation, useQuery, QueryClient } from "react-query";

import { Apis } from "utils/api";
import { setAuthToken, setHeaderAuth } from "utils/loginAuth";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const TitleStyle = styled.h2`
  font-size: 32px;
  color: #000;
`;
const SubTitle = styled.p`
  font-size: 17px;
  color: #9096b2;
`;
const AccountInput = styled.input`
  width: 432px;
  height: 52px;
`;
const RequestUserText = styled.p`
  font-weight: 400;
  font-size: 17px;
  color: #9096b2;
  margin-top: 10px;
`;
const GoogleBtn = styled.button`
  width: 432px;
  height: 57px;
  border-radius: 3px;
  background: #fff;
  font-size: 17px;
  font-weight: 700;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;
const LogOutBtn = styled.button`
  width: 432px;
  height: 57px;
  border-radius: 3px;
  background: #fb2e86;
  font-size: 17px;
  font-weight: 700;
  margin-top: 10px;
`;
const LogInBtn = styled.button`
  width: 432px;
  height: 57px;
  border-radius: 3px;
  background: #fb2e86;
  font-size: 17px;
  font-weight: 700;
  margin-top: 10px;
`;
const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

interface loginParam {
  email: string;
  password: string;
  type: string;
  cookies?: string;
}

const Login: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginType, setLoginType] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(true);

  const { status, data } = useSession();
  const router = useRouter();

  // const queryClient = new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       staleTime: 0,
  //       cacheTime: 5000,
  //     },
  //   },
  // });

  // [useMutation] => 데이터를 생성, 업데이트, 삭제 혹은 서버 사이드 이펙트를 수행
  const logInMutation = useMutation(
    "logInMutation",
    async (userInfo: loginParam) => {
      const res = await Apis.post(
        "/user/login",
        { userInfo },
        { withCredentials: true }
      );
      try {
        console.log(
          "@@@@@@@@@@@@@@@@@@@@@@@loginMutation success >>>>>>>>>>> ",
          res
        );

        setEmail(res.email);
        setPassword(res.password);
        setIsLoggedIn(true);
        setIsLoggedOut(false);
      } catch (err) {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@loginMutation fail >>>>>>>>>>> ");
        console.warn(err);
        alert(
          "아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요."
        );
      }
    }
    // ,
    // {
    //   staleTime: 60000,
    // }
  );

  const logOutMutation = useMutation("logOutMutation", (userInfo: loginParam) =>
    Apis.post("/user/logout", { userInfo }, { withCredentials: true })
      .then((res) => {
        console.log(
          "@@@@@@@@@@@@@@@@@@@@@@@logOutMutation success >>>>>>>>>>> ",
          res
        );
        setEmail("");
        setPassword("");
        setIsLoggedOut(true);
        setIsLoggedIn(false);
      })
      .catch((err) => {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@logOutMutation fail >>>>>>>>>>> ");
        console.warn("로그아웃 실패", err);
      })
  );

  // console.log("logInMutation>>>", logInMutation);
  // console.log("logOutMutation>>>", logOutMutation);

  // 로그인 유지 Hooks
  useEffect(() => {
    console.log("useEffect Started");
    const getToken = window.localStorage.getItem("token");
    const getCookie = document.cookie.slice(7);

    if (window && getCookie) {
      console.log("쿠키 로그인 유지 상태");
      setIsLoggedIn(true);
      setIsLoggedOut(false);
    } else {
      setIsLoggedIn(false);
      setIsLoggedOut(true);
    }
  }, []);

  // 구글 로그인 Hooks
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      console.log("구글 로그인 유지 상태", status, data);
      let email = data.user?.email;
      if (typeof email === "string") {
        setEmail(email);
        setPassword("GooglePasswordNotSet");
        setLoginType("google");

        logInMutation.mutate({
          email: email,
          password: "GooglePasswordNotSet",
          type: "googleLogIn",
          cookies: "GoogleCookie",
        });
      }
      setIsLoggedIn(true);
      setIsLoggedOut(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // 일반 로그인 기능
  const handleLogIn = (type: string) => {
    console.log(
      "handleLogin>>>>>>>",
      email,
      password,
      type,
      document.cookie.slice(7)
    );
    setLoginType(type);

    logInMutation.mutate({
      email: email,
      password: password,
      type: "login",
      cookies: document.cookie.slice(7) ? document.cookie.slice(7) : "",
    });
  };

  // 로그아웃 기능
  const handleLogOut = (type: string) => {
    console.log(
      "handleLogOut>>>>>>>",
      email,
      password,
      type,
      document.cookie.slice(7)
    );

    if (type === "google") {
      logOutMutation.mutate({
        email: email,
        password: password,
        type: "googleLogout",
        cookies: undefined,
      });
      document.cookie = "x_auth = GoogleCookie; max-age=0";
      // () => signOut();
    } else {
      logOutMutation.mutate({
        email: email,
        password: password,
        type: "logout",
        cookies: document.cookie.slice(7) ? document.cookie.slice(7) : "",
        // document.cookie =
        //   "x_auth = "xxxxx"; max-age=0";
      });
    }
  };

  // 회원 탈퇴 기능
  const handleDropMember = () => {
    console.log("dropMember>>>>>>>");
    // dropMemberMutation.mutate({ email: email });
    // (userInfo: loginParam) => Apis.post("/user/dropMember", { userInfo }),
    Apis.post("/user/dropMember", email)
      .then((res) => {
        console.log("dropMember success", res);
        // router.push("/login");
      })
      .catch((err) => console.log(err));
    setEmail("");
    setPassword("");
    // router.push("/");
  };

  return (
    <div className="w-full min-w-[1200px]">
      <div className="w-full">
        <div className="top w-full h-[764px] bg-[#f2f0ff] flex justify-center flex-col text-center text-[53px] font-bold font-josefin relative">
          {logInMutation.isLoading || logOutMutation.isLoading ? (
            <div>LOADING 중입니다🎵🎵🎵🎵🎵🎵🎵🎵🎵🎵🎵🎵🎵🎵🎵🎵🎵...</div>
          ) : (
            <>
              {/* {!isLoggedIn && isLoggedOut ? ( */}
              {/* {!logInMutation.isSuccess && logInMutation.data == undefined ? ( */}
              {!isLoggedIn ? (
                // 로그인 화면
                <div className="login-wrapper">
                  <div className="title_wrapper">
                    <TitleStyle>Login</TitleStyle>
                    <SubTitle>Please login using account detail below</SubTitle>
                  </div>

                  {/* email */}
                  <div className="id_wrapper">
                    <label htmlFor="id"></label>
                    <AccountInput
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Email Address"
                      id="id"
                    ></AccountInput>
                  </div>

                  {/* password */}
                  <div className="password_wrapper">
                    <label htmlFor="password"></label>
                    <AccountInput
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Password"
                      id="password"
                    ></AccountInput>
                  </div>

                  {/* button */}
                  <BtnWrap>
                    <RequestUserText>
                      Don&apos;t have an Account?&nbsp;
                      <Link href="/signup">Create account</Link>
                    </RequestUserText>
                    <RequestUserText>
                      Forget your Account?&nbsp;
                      <Link href="/reset">Find account</Link>
                    </RequestUserText>
                    <LogInBtn
                      onClick={() => handleLogIn("normal")}
                      id="signin_btn"
                    >
                      Log In
                    </LogInBtn>
                    <GoogleBtn onClick={() => signIn("google")} id="google">
                      <Image
                        src="https://authjs.dev/img/providers/google.svg"
                        width={32}
                        height={32}
                        alt="google img"
                      />
                      google
                    </GoogleBtn>
                  </BtnWrap>
                </div>
              ) : (
                // 로그인 성공
                <div className="login-wrapper">
                  <div className="title_wrapper">
                    <TitleStyle>Login 성공</TitleStyle>
                    <SubTitle>로그인 성공했다</SubTitle>
                  </div>

                  {/* button */}
                  <BtnWrap>
                    {loginType === "google" ? (
                      <LogOutBtn
                        onClick={() => {
                          document.cookie = "x_auth = GoogleCookie; max-age=0";
                          signOut("google");
                        }}
                        id="signout_btn"
                      >
                        구글 Logout
                      </LogOutBtn>
                    ) : (
                      <LogOutBtn
                        onClick={() => handleLogOut("normal")}
                        id="signout_btn"
                      >
                        일반 Logout
                      </LogOutBtn>
                    )}

                    <LogOutBtn
                      onClick={() => handleDropMember()}
                      id="signout_btn"
                    >
                      회원탈퇴
                    </LogOutBtn>
                  </BtnWrap>
                  <div className="request_user">
                    {/* <LogInBtn onClick={checkLogIn} id="signout_btn">
                    check
                  </LogInBtn> */}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
