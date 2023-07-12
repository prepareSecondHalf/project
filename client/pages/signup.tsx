import { NextPage } from "next";
import { useState, useEffect, useCallback } from "react";
import { useMutation, useQuery } from "react-query";
import { Apis } from "utils/api";
import axios from "axios";
import {
  Iamport,
  RequestPayParams,
  RequestPayResponse,
} from "../interface/IFcPayment";

import { useRouter } from "next/router";

import styled from "styled-components";

const TitleStyle = styled.h2`
  font-size: 32px;
  color: #000;
`;
const SubTitleStyle = styled.p`
  font-size: 17px;
  color: #9096b2;
`;
const AccountInput = styled.input.attrs(() => ({ id: "phone_number" }))`
  margin-right: 10px !important;
  width: 432px;
  height: 52px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #fff;
  border: 1px solid !important;
  border-color: #6b7280 !important;
  border-width: 1px !important;
  border-radius: 0px;
  padding-top: 0.5rem;
  padding-right: 0.75rem;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem !important;
  font-size: 1rem;
  line-height: 1.5rem;
  --tw-shadow: 0 0 #0000;

  &&::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const AccountParaSucc = styled.p`
  font-size: 10px;
  width: 432px;
  text-align: left;
  margin: 8px 0 0 13px;
  color: red;
`;
const AccountParaFail = styled.p`
  font-size: 10px;
  width: 432px;
  text-align: left;
  margin: 8px 0 0 13px;
  color: blue;
`;
const AccountPara = styled.p`
  font-size: 10px;
  color: #a1a1a1;
  width: 432px;
  text-align: left;
  margin: 8px 0 0 -10px;
`;
const RequestUserText = styled.p`
  fontweight: 400;
  font-size: 17px;
  margintop: 10px;
`;
const SignUpBtn = styled.button`
  width: 432px;
  height: 57px;
  background-color: #fb2e86;
  font-size: 17px;
  font-weight: 700;
  color: #fff;
`;
const InputWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 30px;
  margin-top: 10px;
  align-items: center;
`;
const InputPasswordWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  margin-left: 30px;
`;
const InputPhoneNumbWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  margin-left: 30px;
`;
const InputPhoneNumbTempWrap = styled.div`
  display: flex;
  align-items: center;
`;
const AuthenticateButton = styled.input`
  // border: 1px solid #000;
  // border-left: unset;
  margin-left: 0px;
  background-color: #fb2e86;
  color: #fff;
  font-size: 12px;
  padding: 13px;
  font-weight: bold;
`;
const InputSubWrap = styled.div`
  width: 432px;
  display: flex;
  margin-right: 10px;
`;
const PasswordSubWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;
const InputTempWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 30px;
  margin-right: 30px;
`;

interface memberParam {
  name: string;
  nickname: string;
  email: string;
  password: string;
  phone: string;
  IMP?: Iamport;
}

const Login: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const [isCertified, setIsCertified] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isEmailCertified, setIsEmailCertified] = useState<boolean>(false);
  const [isNicknameCertified, setIsNicknameCertified] =
    useState<boolean>(false);
  const [isPasswordCertified, setIsPasswordCertified] =
    useState<boolean>(false);
  const [isPasswordCheckCertified, setIsPasswordCheckCertified] =
    useState<boolean>(false);
  // const [profilePhoto, setProfilePhoto] = useState<string>("");

  const router = useRouter();

  const signUpMutation = useMutation(
    "signup",
    (userInfo: memberParam) => Apis.post("/user/register", { userInfo }),
    {
      onMutate: (variable) => {
        console.log("onmutate", variable);
      },
      onSuccess: async (res) => {
        console.log("로그인 성공", res);
      },
      onError: (error) => {
        console.log("로그인 실패", error);
      },
    }
  );

  const handleSignUpBtn = () => {
    console.log("signUpBtn>>>>>>>>>>");
    if (
      isEmailCertified &&
      name &&
      isNicknameCertified &&
      isPasswordCertified &&
      isCertified &&
      isClicked
    ) {
      console.log("회원가입 성공!!!!!!!!!!!!!!!");
      let body = {
        email: email,
        name: name,
        nickname: nickname,
        password: password,
        phone: phone,
        // profilePhoto: profilePhoto,
      };
      Apis.post("/user/register", body)
        .then((res) => {
          console.log("signup success", res);
          router.push("/");
          alert("회원가입 성공!!!!!!!!!!!!!!!");
        })
        .catch((err) => {
          alert("회원가입 실패!!!!!!!!!!!!!!!");
          console.warn(err);
        });

      // signUpMutation.mutate({
      //   email: email,
      //   password: password,
      //   birth: birth,
      //   phone: phone,
      // });
    }
  };

  // const IMP = window?.IMP; // 생략 가능
  useEffect(() => {
    setIsClicked(false);
    if (window && window.IMP) window.IMP.init("imp23735785");
  }, []);

  const authenticateUser = () => {
    console.log("authenticateUser =>>>1");
    // const imp_uid = "9810030929"; // CPID
    const imp_uid = "imp_300991371283"; // imp_uid

    window.IMP?.init("imp23735785"); // 가맹점 식별코드
    console.log("authenticateUser =>>>2");
    window.IMP?.certification(
      {
        // param
        // 주문 번호
        // pg: "PG사코드.{CPID}", //본인인증 설정이 2개이상 되어 있는 경우 필
        pg: `danal_tpay.${imp_uid}`,
        merchant_uid: `mid_${new Date().getTime()}`,
        // 모바일환경에서 popup:false(기본값) 인 경우 필수
        // m_redirect_url: "{리디렉션 될 URL}",
        // PC환경에서는 popup 파라미터가 무시되고 항상 true 로 적용됨
        popup: true,
      },
      (rsp: any) => {
        // callback
        setIsClicked(true);
        if (rsp.success) {
          console.log("res success ==> ", rsp);
          // 인증 성공 시 로직,
          setIsCertified(true);
          axios({
            url: "http://localhost:8080/user/certifications",
            method: "post",
            headers: { "Content-Type": "application/json" },
            data: { imp_uid: rsp.imp_uid },
          })
            .then((res) => {
              console.log("[certification] success res ==> ", res);
              setPhone(res.data.response.phone);
            })
            .catch((err) => {
              console.warn("[certification] failure res ==> ", err);
            });

          // ...
        } else {
          console.warn("res fail ==> ", rsp);
          // 인증 실패 시 로직,
          setIsCertified(false);
          alert(`인증에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
        }
      }
    );
  };

  const validatePassword = () => {
    let hasEnglishLowerLetters = /[a-z]/.test(password);
    let hasEnglishUpperLetters = /[A-Z]/.test(password);
    let hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    let hasNumbers = /[0-9]/.test(password);
    let isLongEnough = password.length > 7;

    if (
      hasEnglishLowerLetters &&
      hasEnglishUpperLetters &&
      hasSpecialChars &&
      hasNumbers &&
      isLongEnough
    ) {
      console.log("조건에 맞는 비밀번호 입니다.");
      setIsPasswordCertified(true);
      // return true;
    }
    // alert("비밀번호 형식이 맞지 않습니다.\n 다시 입력해주세요.");
    // return false;
  };

  const validatePasswordCheck = () => {
    console.log(
      "check  ===> ",
      password,
      "-",
      passwordCheck,
      "-",
      password! == passwordCheck
    );
    if (password === passwordCheck) setIsPasswordCheckCertified(true);
    else {
      setIsPasswordCheckCertified(false);
    }
  };
  const validateEmail = async () => {
    console.log("validateEmail", email, email.length, "<===");

    // 이메일 중복 확인
    if (email.length > 0) {
      let userInfo = { email: email };
      console.log("validateEmail", userInfo, "<===");
      let result = await Apis.post("/user/email", userInfo, {
        withCredentials: true,
      });

      if (result.success) {
        setIsEmailCertified(true);
      } else {
        alert(`${result.value}`);
        setIsEmailCertified(false);
      }
    } else {
      setIsNicknameCertified(false);
      alert("이메일을 입력해주세요");
    }
  };

  // const res = await Apis.post("/user/login", { email }, { withCredentials: true });

  const validateNickName = async () => {
    console.log("validateNickName");

    // 닉네임 중복 확인
    if (nickname.length > 0) {
      let userInfo = { nickname: nickname };
      console.log("validateNickName", userInfo, "<===");
      let result = await Apis.post("/user/nickname", userInfo, {
        withCredentials: true,
      });

      if (result.success) {
        setIsNicknameCertified(true);
      } else {
        alert(`${result.value}`);
        setIsNicknameCertified(false);
      }
    } else {
      setIsNicknameCertified(false);
      alert("닉네임을 입력해주세요");
    }
  };
  // if (isPasswordCertified) {
  //   alert("비밀번호가 같습니다.");
  // } else if (password !== passwordCheck) {
  //   alert("비밀번호가 서로 같지 않습니다.\n 다시 입력해주세요."); // alert가 생기면서 re-render 된다 (validatePasswordCheck 함수가 무한루프 돌듯이)
  // }
  // console.log("check$$$$$");
  return (
    <div className="w-full min-w-[1200px]">
      <div className="w-full">
        <div className="top w-full h-[764px] bg-[#f2f0ff] flex justify-center flex-col text-center text-[53px] font-bold font-josefin relative">
          <div className="login-wrapper">
            <div className="title_wrapper">
              <TitleStyle>Signup</TitleStyle>
              <SubTitleStyle>
                Please signup using personal account detail below
              </SubTitleStyle>
            </div>

            {/* <div className="id_wrapper">
                        // <label htmlFor="id"></label>
                        <input style={accountInput} type="text" placeholder="4~20자리 / 영문, 숫자, 특수문자 '_' 사용가능" className="id" />
                    </div> */}
            <InputWrap className="email_wrapper">
              {/* {/* <label htmlFor="email"></label> */}
              <InputSubWrap>
                <AccountInput
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  placeholder="이메일"
                  className="email"
                ></AccountInput>
                <AuthenticateButton
                  type="button"
                  value="이메일 인증"
                  onClick={validateEmail}
                ></AuthenticateButton>
              </InputSubWrap>
              {isEmailCertified ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="green"
                  width="24px"
                  height="24px"
                >
                  <path d="M9 16.17L5.53 12.7a.996.996 0 1 1 1.41-1.41L9 13.17l7.88-7.88a.996.996 0 1 1 1.41 1.41L9 16.17z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="red"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="24px"
                  height="24px"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              )}
            </InputWrap>

            <InputWrap className="name_wrapper">
              {/* {/* <label htmlFor="name"></label> */}
              <AccountInput
                onChange={(e) => setName(e.target.value)}
                name="name"
                type="name"
                placeholder="이름"
                className="name"
              ></AccountInput>
              {name.length > 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="green"
                  width="24px"
                  height="24px"
                >
                  <path d="M9 16.17L5.53 12.7a.996.996 0 1 1 1.41-1.41L9 13.17l7.88-7.88a.996.996 0 1 1 1.41 1.41L9 16.17z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="red"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="24px"
                  height="24px"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              )}
            </InputWrap>

            <InputPasswordWrap className="password_wrapper">
              {/* {/* <label htmlFor="password"></label> */}
              <PasswordSubWrap>
                <AccountInput
                  onKeyUp={validatePassword}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  className="password"
                ></AccountInput>
                {isPasswordCertified ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="green"
                    width="24px"
                    height="24px"
                  >
                    <path d="M9 16.17L5.53 12.7a.996.996 0 1 1 1.41-1.41L9 13.17l7.88-7.88a.996.996 0 1 1 1.41 1.41L9 16.17z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="red"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="24px"
                    height="24px"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                )}
              </PasswordSubWrap>

              <AccountPara>
                8자 이상, 영문 대소문자, 숫자, 특수문자 조합으로 입력해 주세요.
              </AccountPara>
            </InputPasswordWrap>

            <InputWrap className="password_check_wrapper">
              {/* {/* <label htmlFor="password_check"></label> */}
              <AccountInput
                type="password"
                onKeyUp={validatePasswordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
                name="passwordCheck"
                placeholder="비밀번호 확인"
                className="password_check"
              ></AccountInput>
              {isPasswordCheckCertified ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="green"
                  width="24px"
                  height="24px"
                >
                  <path d="M9 16.17L5.53 12.7a.996.996 0 1 1 1.41-1.41L9 13.17l7.88-7.88a.996.996 0 1 1 1.41 1.41L9 16.17z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="red"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="24px"
                  height="24px"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              )}
            </InputWrap>

            <InputWrap className="nickname_wrapper">
              {/* {/* <label htmlFor="nickname"></label> */}
              <InputSubWrap>
                <AccountInput
                  onChange={(e) => setNickname(e.target.value)}
                  name="pickname"
                  type="nickname"
                  placeholder="닉네임"
                  className="nickname"
                ></AccountInput>
                <AuthenticateButton
                  type="button"
                  value="닉네임 인증"
                  onClick={validateNickName}
                ></AuthenticateButton>
              </InputSubWrap>
              {isNicknameCertified ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="green"
                  width="24px"
                  height="24px"
                >
                  <path d="M9 16.17L5.53 12.7a.996.996 0 1 1 1.41-1.41L9 13.17l7.88-7.88a.996.996 0 1 1 1.41 1.41L9 16.17z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="red"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="24px"
                  height="24px"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              )}
            </InputWrap>

            <InputPhoneNumbWrap className="phone_number_wrapper">
              {/* {/* <label htmlFor="phone_number"></label> */}

              <InputPhoneNumbTempWrap>
                <InputSubWrap>
                  <AccountInput
                    // onChange={(e) => setPhone(e.target.value)}
                    name="phone"
                    type="number"
                    placeholder={phone}
                    readOnly
                    className="phone_number"
                  ></AccountInput>
                  <AuthenticateButton
                    type="button"
                    value="휴대폰인증"
                    onClick={authenticateUser}
                  ></AuthenticateButton>
                </InputSubWrap>

                {isCertified && isClicked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="green"
                    width="24px"
                    height="24px"
                  >
                    <path d="M9 16.17L5.53 12.7a.996.996 0 1 1 1.41-1.41L9 13.17l7.88-7.88a.996.996 0 1 1 1.41 1.41L9 16.17z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="red"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="24px"
                    height="24px"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                )}
              </InputPhoneNumbTempWrap>

              {isCertified && isClicked ? (
                <AccountParaSucc>인증이 완료 되었습니다.</AccountParaSucc>
              ) : isClicked ? (
                <>
                  <AccountParaFail>
                    인증이 실패 했습니다. 다시 시도해 주세요.
                  </AccountParaFail>
                  <AccountPara>
                    {/* &#39;-&#39; 빼고 숫자만 입력해 주세요. */}
                    휴대폰 인증 버튼을 눌러주세요.
                  </AccountPara>
                </>
              ) : (
                <AccountPara>
                  &#39;-&#39; 빼고 숫자만 입력해 주세요.
                </AccountPara>
              )}
            </InputPhoneNumbWrap>

            <div className="request_user">
              {/* <p style={requestUserText}>Forget your password?</p> */}
              <SignUpBtn
                onClick={() => handleSignUpBtn()}
                className="signup_complete_btn"
              >
                회원가입 완료
              </SignUpBtn>
              {/* <p style={requestUserText}>Don't have an Account? Create account</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
