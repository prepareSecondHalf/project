import axios from "axios";
import { NextPage } from "next";
import { BaseSyntheticEvent, useState } from "react";
import styled from "styled-components";
import { useMutation } from "react-query";
import { Apis } from "utils/api";

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
  fontweight: 400;
  font-size: 17px;
  color: #9096b2;
  margintop: 10px;
`;
const LogInBtn = styled.button`
  width: 432px;
  height: 57px;
  borderradius: 3px;
  background: #fb2e86;
  font-size: 17px;
  fontweight: 700;
`;

const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(true);

  // const { mutate, isLoading, isError, data, error } = useMutation(
  //   "handleLogout",
  //   () => Apis.post("/post", "user/logout"),
  //   {
  //     onSuccess: (res) => {
  //       console.log("res:::", res);
  //       setIsLoggedIn(false);
  //       setIsLoggedOut(true);
  //     },
  //     onError: (error) => {
  //       console.log("로그아웃 실패", error);
  //     },
  //   }
  // );

  const handleLogout = async (): Promise<any> => {
    console.log("로그아웃 성공");
    const { isLoading, isError, data, error } = useMutation(
      "handleLogout",
      () => Apis.post("/post", "user/logout"),
      {
        onSuccess: (res) => {
          console.log("res:::", res);
          setIsLoggedIn(false);
          setIsLoggedOut(true);
        },
        onError: (error) => {
          console.log("로그아웃 실패", error);
        },
      }
    );
  };
  // const handleLogout = async (): Promise<any> => {
  //   await axios
  //     .post("http://localhost:8080/api/user/logout")
  //     .then((res) => {
  //       console.log("로그아웃 성공", res);
  //       setIsLoggedIn(false);
  //       setIsLoggedOut(true);
  //     })
  //     .catch((err) => {
  //       console.log("로그아웃 실패", err);
  //     });
  // };

  // async function handleLogin(e: BaseSyntheticEvent): Promise<any> {
  async function handleLogin(e: BaseSyntheticEvent) {
    e.preventDefault();

    if (!email || !password) {
      return alert("이메일 또는 패스워드를 확인해주세요");
    } else {
      let body = {
        email,
        password,
      };

      await axios
        .post("/login", body)
        .then((res) => {
          console.log("로그인 성공", res);
          setIsLoggedIn(true);
          setIsLoggedOut(false);
        })
        .catch((err) => {
          console.log("로그인 실패", err);
        });
    }
  }

  return (
    <div className="w-full min-w-[1200px]">
      <div className="w-full">
        <div className="top w-full h-[764px] bg-[#f2f0ff] flex justify-center flex-col text-center text-[53px] font-bold font-josefin relative">
          <>
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
                <div className="request_user">
                  <RequestUserText>
                    Don't have an Account? Create account
                  </RequestUserText>
                  <LogInBtn onClick={handleLogin} id="signin_btn">
                    Log In
                  </LogInBtn>
                </div>
              </div>
            ) : (
              // 로그인 성공
              <div className="login-wrapper">
                <div className="title_wrapper">
                  <TitleStyle>Login 성공</TitleStyle>
                  <SubTitle>로그인 성공했다</SubTitle>
                </div>

                {/* button */}
                <div className="request_user">
                  <LogInBtn onClick={() => handleLogout()} id="signout_btn">
                    Logout
                  </LogInBtn>
                </div>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );

  interface PropsType {
    // onClick?: (e: React.KeyboardEvent) => void;
  }
};

export default Login;
