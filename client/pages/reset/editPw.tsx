import { NextPage } from "next";
import { Apis } from "utils/api";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";


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
  margin-bottom: 32px;
`;
const Form = styled.form`
  color: #212121;
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
`;
const InputBoxTitle = styled.div`
  color: #212121;
  margin-bottom: 16px;
  font-weight: bold;
  margin-top: 24px;
`;
const InputBoxInput = styled.input`
  color: #212121;
  margin-bottom: 16px;
  width: 100%;
  -webkit-appearance: none;
  margin: 0;

  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &::-webkit-inner-spin-button {
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
const InputPasswordWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  margin-left: 30px;
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
const AccountPara = styled.p`
  font-size: 10px;
  color: #a1a1a1;
  width: 432px;
  text-align: left;
`;
const InputWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
  align-items: center;
`;

const Reset: NextPage = () => {
    const [password, setPassword] = useState<string>("");
    const [passwordCheck, setPasswordCheck] = useState<string>("");
    const [isPasswordCertified, setIsPasswordCertified] =
    useState<boolean>(false);
    const [isPasswordCheckCertified, setIsPasswordCheckCertified] =
    useState<boolean>(false);
    
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

      const resetPassword = async (e: Event) => {
        e.preventDefault();
        if (isPasswordCertified && isPasswordCheckCertified) {
        const res = await Apis.post(`user/reset/forgot-password`, { userEmail: String });
        console.log("getUserPassword2  ======> ", res);
        } else {
            alert("다시 입력해주세요.")
        }

      }

  return (
    <div className="w-full min-w-[1200px]">
      <div className="w-full">
        <div className="top w-full h-[764px] bg-[#f2f0ff] flex justify-center flex-col text-center text-[53px] font-bold font-josefin relative">
          <Container>
            <Box>
              <BoxHeader>비밀번호 재설정 </BoxHeader>
              <BoxContent>
                <Description>
                  새로운 비밀번호를 입력해주세요.
                </Description>
                <Form>
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
                            
                        {
                            isPasswordCertified ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="green"
                                    width="24px"
                                    height="24px"
                                >
                                    <path d="M9 16.17L5.53 12.7a.996.996 0 1 1 1.41-1.41L9 13.17l7.88-7.88a.996.996 0 1 1 1.41 1.41L9 16.17z" />
                                </svg>) 
                        : (
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
                            ><path d="M18 6L6 18M6 6l12 12" /></svg>
                        )}
                        </PasswordSubWrap>
                        <AccountPara>
                            8자 이상, 영문 대소문자, 숫자, 특수문자 조합으로 입력해 주세요.
                        </AccountPara>

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
   
                    <Button onClick={(e) => resetPassword(e)}>
                        비밀번호 변경
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

export default Reset;
