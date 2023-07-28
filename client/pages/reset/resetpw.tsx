import { NextPage } from "next";
import Link from "next/link";
import { Apis } from "utils/api";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Iamport,
  RequestPayParams,
  RequestPayResponse,
} from "../interface/IFcPayment";

const Container = styled.div`
  display: flex;
`;
const Box = styled.div`
  width: 520px;
  margin: 0 auto;
  border-radius: 8px;
  border: solid 1px #e0e0e0;
  background-color: #fff;
`;
const BoxHeader = styled.div`
  padding: 24px 32px;
  border-bottom: solid 1px #e0e0e0;
  color: #212121;
  font-size: 24px;
  line-height: 36px;
  font-weight: 400;
`;
const BoxContent = styled.div`
  padding: 24px 32px 32px;
  text-align: left;
`;
const Description = styled.div`
  color: #212121;
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
  margin-bottom: 22px;
`;
const Form = styled.form`
  color: #212121;
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
`;
const InputPasswordWrap = styled.div`
  // display: flex;
  // flex-direction: column;
  // align-items: center;
`;
const PasswordSubWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-direction: row;
  justify-content: center;
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
const Button = styled.button`
  background-color: rgb(247 33 130 / var(--tw-bg-opacity));
  color: #fff;
  border: #2099bb;
  margin-top: 24px;
  padding: 11px 24px;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border-radius: 4px;
  width: 100%;
}
`;
const AccountPara = styled.p`
  font-size: 10px;
  color: #a1a1a1;
  width: 432px;
  text-align: left;
  margin: 3px 0 10px 0;
`;
const InputWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
// interface ResetPage {
//   onclick: function getUserEmail(params:type) {

//   }
// }

const Resetpw: NextPage = () => {
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [isPasswordCertified, setIsPasswordCertified] =
    useState<boolean>(false);
  const [isPasswordCheckCertified, setIsPasswordCheckCertified] =
    useState<boolean>(false);

  useEffect(() => {
    // if (window && window.IMP) window.IMP.init("imp23735785");
    console.log("check ===> ", location.href);
    console.log("check ===> ", location.href.split("?"));
    console.log("check ===> ", location.href.split("?")[1]);

    let token = location.href.split("?")[1];
    setToken(token);
    // https://techlog.io/Server/Node-js/node-js%EC%97%90%EC%84%9C-%EC%9D%B4%EB%A9%94%EC%9D%BC-%EC%9D%B8%EC%A6%9D%EC%9D%84-%ED%86%B5%ED%95%9C-%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8-%EC%B4%88%EA%B8%B0%ED%99%94-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0/
  }, []);

  const maskingEmail = (email: string) => {
    return email.substring(0, 2) + "***" + email.substring(5, email.length);
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
    if (isPasswordCertified && password === passwordCheck)
      setIsPasswordCheckCertified(true);
    else {
      setIsPasswordCheckCertified(false);
    }
  };

  return (
    <div className="w-full min-w-[1200px]">
      <div className="w-full">
        <div className="top w-full h-[764px] bg-[#f2f0ff] flex justify-center flex-col text-center text-[53px] font-bold font-josefin relative">
          <Container>
            <Box>
              <BoxHeader>비밀번호 재설정</BoxHeader>
              <BoxContent>
                <Description>새로운 비밀번호를 입력해주세요.</Description>
                <Form>
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
                      8자 이상, 영문 대소문자, 숫자, 특수문자 조합으로 입력해
                      주세요.
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
                  <Button onClick={(e: Event) => getUserEmail(e)}>
                    재설정하기
                  </Button>
                </Form>
              </BoxContent>
            </Box>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Resetpw;
