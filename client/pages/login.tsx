import axios from "axios";
import { NextPage } from "next";
import { BaseSyntheticEvent, useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { Apis } from "utils/api";
import { setAuthToken, setHeaderAuth } from "utils/loginAuth";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

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
}

const Login: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(true);

  const logOutMutation = useMutation(
    (userInfo: loginParam) => Apis.post("/user/logout", { userInfo }),
    {
      onMutate: (variable) => {
        console.log("onmutate", variable);
      },
      onSuccess: async (res) => {
        console.log("res:::", res);
        setIsLoggedIn(false);
        setIsLoggedOut(true);
      },
      onError: (error) => {
        console.log("로그아웃 실패", error);
      },
    }
  );

  const logInMutation = useMutation(
    "loginStaus",
    (userInfo: loginParam) => Apis.post("/user/login", { userInfo }),
    {
      onMutate: (variable) => {
        console.log("onmutate", variable);
        // console.log("logInMutation4444444444", logInMutation);

        setEmail(variable.email);
        // setPassword(variable.password);
        setPassword("password123");
      },
      onSuccess: async (res) => {
        console.log("로그인 성공", res);
        setIsLoggedIn(true);
        setIsLoggedOut(false);
        setAuthToken(res.userId, res.email);
      },
      onError: (error) => {
        console.log("로그인 실패", error);
        // alert(
        //   "아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요."
        // );
      },
    }
  );

  // const logInMutation = useMutation(
  //   "loginStaus",
  //   (userInfo: loginParam) => Apis.post("/user/login", { userInfo }),
  //   {
  //     onMutate: (variable) => {
  //       console.log("onmutate", variable);
  //       // console.log("logInMutation4444444444", logInMutation);

  //       setEmail(variable.email);
  //       // setPassword(variable.password);
  //       setPassword("password123");
  //     },
  //     onSuccess: async (res) => {
  //       console.log("로그인 성공", res);
  //       setIsLoggedIn(true);
  //       setIsLoggedOut(false);
  //       setAuthToken(res.userId, res.email);
  //     },
  //     onError: (error) => {
  //       console.log("로그인 실패", error);
  //       // alert(
  //       //   "아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요."
  //       // );
  //     },
  //   }
  // );

  const dropMemberMutation = useMutation(
    "dropMember",
    (userInfo: loginParam) => Apis.post("/user/dropMember", { userInfo }),
    {
      onMutate: (variable) => {
        console.log("onmutate", variable);
      },
      onSuccess: async (res) => {
        console.log("로그인 성공", res);
        setAuthToken("", "");
      },
      onError: (error) => {
        console.log("로그인 실패", error);
      },
    }
  );
  // console.log("logInMutation111111111", logInMutation);

  const { status, data } = useSession();
  const router = useRouter();
  useEffect(() => {
    console.log("google", status, data);
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      setIsLoggedIn(true);
      setIsLoggedOut(false);
    }
  }, [status]);

  useEffect(() => {
    // console.log("logInMutation2222222", logInMutation);

    const getToken = window.localStorage.getItem("token");
    const getEmail = window.localStorage.getItem("email");

    // console.log("useEffect2>>>>>", getToken);
    // console.log("useEffect3>>>>>", getEmail);
    // console.log("useEffect4>>>>>", logInMutation);
    // console.log("logInMutation33333333333", logInMutation);

    if (typeof window !== undefined && getToken !== null) {
      // console.log("getEmail, getToken");
      // console.log(getEmail, getToken);

      if (getEmail !== null && getToken !== null) {
        // alert(`로그인을 시작합니다. (계정 : ${getEmail})`);

        logInMutation.mutate({ email: getEmail, password: getToken });
        setIsLoggedIn(true);
        setIsLoggedOut(false);
      }
    } else {
      alert("else");
    }
  }, []);

  // if (logInMutation.isSuccess) {
  // console.log(loginMutation)
  // setAuthToken(logInMutation.data.token);
  // }

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
    setIsLoggedIn(false);
    setIsLoggedOut(true);
    setEmail("");
    setPassword("");
    // router.push("/");
  };

  const handleLogOut = (type: string) => {
    console.log("handleLogOut>>>>>>>", type);

    if (type === "google") {
      console.log("google logout...");
      setIsLoggedIn(false);
      () => signOut();
    } else {
      logOutMutation.mutate({ email: "", password: "" });
    }
    setIsLoggedIn(false);
    setIsLoggedOut(true);
    setEmail("");
    setPassword("");
  };

  const handleLogIn = () => {
    console.log("handleLogin>>>>>>>", email, password);
    if (!email || !password) {
      return alert("이메일 또는 패스워드를 확인해주세요");
    } else {
      logInMutation.mutate(
        { email: email, password: password },
        {
          onSuccess: (data, variables, context) => {
            console.log("handleLogIn@@@@@@@@@@onSuccess");
          },
          onError: (error, variables, cotext) => {
            console.log("handleLogIn!!!!!!onError");
          },
        }
      );
    }
  };

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
                <BtnWrap>
                  <RequestUserText>
                    Don&apos;t have an Account?
                    <Link href="/signup">Create account</Link>
                  </RequestUserText>
                  <LogInBtn onClick={handleLogIn} id="signin_btn">
                    Log In
                  </LogInBtn>

                  <GoogleBtn onClick={() => signIn("google")} id="google">
                    <img
                      src="https://authjs.dev/img/providers/google.svg"
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
                  <LogInBtn
                    onClick={() => handleLogOut("google")}
                    id="signout_btn"
                  >
                    Logout
                  </LogInBtn>
                  <LogInBtn onClick={() => handleDropMember()} id="signout_btn">
                    회원탈퇴
                  </LogInBtn>
                </BtnWrap>
                <div className="request_user">
                  {/* <LogInBtn onClick={checkLogIn} id="signout_btn">
                    check
                  </LogInBtn> */}
                </div>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default Login;
