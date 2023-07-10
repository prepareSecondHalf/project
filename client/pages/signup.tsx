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
  margin: 8px 0 0 13px;
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
  flex-direction: column;
  align-items: center;
  margin-top: 28px;
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
        router.push("/login");
      })
      .catch((err) => console.log(err));

    // signUpMutation.mutate({
    //   email: email,
    //   password: password,
    //   birth: birth,
    //   phone: phone,
    // });
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
                        <input style={accountInput} type="text" placeholder="4~20자리 / 영문, 숫자, 특수문자 '_' 사용가능" id="id" />
                    </div> */}
            <InputWrap className="email_wrapper">
              {/* {/* <label htmlFor="email"></label> */}
              <AccountInput
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                placeholder="이메일"
                id="email"
              ></AccountInput>
            </InputWrap>

            <InputWrap className="name_wrapper">
              {/* {/* <label htmlFor="name"></label> */}
              <AccountInput
                onChange={(e) => setName(e.target.value)}
                name="name"
                type="name"
                placeholder="이름"
                id="name"
              ></AccountInput>
            </InputWrap>

            <InputWrap className="password_wrapper">
              {/* {/* <label htmlFor="password"></label> */}
              <AccountInput
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                placeholder="비밀번호"
                id="password"
              ></AccountInput>
              <AccountPara>
                8자 이상, 영문 대소문자, 숫자, 특수문자 조합으로 입력해 주세요.
              </AccountPara>
            </InputWrap>

            <InputWrap className="password_check_wrapper">
              {/* {/* <label htmlFor="password_check"></label> */}
              <AccountInput
                type="password"
                onChange={(e) => setPasswordCheck(e.target.value)}
                name="passwordCheck"
                placeholder="비밀번호 확인"
                id="password_check"
              ></AccountInput>
            </InputWrap>

            <InputWrap className="nickname_wrapper">
              {/* {/* <label htmlFor="nickname"></label> */}
              <AccountInput
                onChange={(e) => setNickname(e.target.value)}
                name="pickname"
                type="nickname"
                placeholder="닉네임"
                id="nickname"
              ></AccountInput>
            </InputWrap>

            <InputWrap className="phone_number_wrapper">
              {/* {/* <label htmlFor="phone_number"></label> */}
              <InputSubWrap>
                <AccountInput
                  // onChange={(e) => setPhone(e.target.value)}
                  name="phone"
                  type="number"
                  placeholder={phone}
                  readOnly
                  id="phone_number"
                ></AccountInput>
                <AuthenticateButton
                  type="button"
                  value="휴대폰인증"
                  onClick={authenticateUser}
                ></AuthenticateButton>
              </InputSubWrap>
              {isCertified && isClicked ? (
                <AccountParaSucc>인증이 완료 되었습니다.</AccountParaSucc>
              ) : isClicked ? (
                <>
                  <AccountParaFail>
                    인증이 실패 했습니다. 다시 시도해 주세요.
                  </AccountParaFail>
                  <AccountPara>
                    &#39;-&#39; 빼고 숫자만 입력해 주세요.
                  </AccountPara>
                </>
              ) : (
                <AccountPara>
                  &#39;-&#39; 빼고 숫자만 입력해 주세요.
                </AccountPara>
              )}
            </InputWrap>

            {/* <div className="profile_photo_wrapper">
              <AccountInput
                // onChange={(e) => setProfilePhoto(e.target.value)}
                type="file"
                // placeholder="upload"
                id="profile_photo"
              ></AccountInput>
            </div> */}

            {/* <div className="birth_wrapper">
              // // <label htmlFor="birth"></label>
              <input
                onChange={(e) => setBirth(e.target.value)}
                style={accountInput}
                type="number"
                placeholder="YYYYMMDD"
                id="birth"
              />
            </div> */}

            <div className="request_user">
              {/* <p style={requestUserText}>Forget your password?</p> */}
              <SignUpBtn
                onClick={() => handleSignUpBtn()}
                id="signup_complete_btn"
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
