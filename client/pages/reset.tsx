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

// interface ResetPage {
//   onclick: function getUserEmail(params:type) {

//   }
// }

const Reset: NextPage = () => {
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    if (window && window.IMP) window.IMP.init("imp23735785");
  }, []);

  const maskingEmail = (email: string) => {
    return email.substring(0, 2) + "***" + email.substring(5, email.length);
  };

  const getUserPassword = async (e: Event) => {
    // /reset/email
    console.log("getUserPassword1  ======> ", userEmail);
    e.preventDefault();

    // 1. db에 존재하는 계정이 맞는지 먼저 확인 후, 있다면 이메일로 해당 링크 전송 + alert로 이메일 전송 알림
    // 2. 없다면, alert로 알림
    location.href = "http://localhost:3000/reset/resetpw";

    const res = await Apis.post(`user/reset/forgot-password`, { userEmail });
    console.log("getUserPassword2  ======> ", res);

    // console.log("[getUserPassword] ====> ", res);
  };

  const getUserEmail = async (e: Event) => {
    console.log("getUserEmail", name, number);
    let type = "email";
    e.preventDefault();
    if (name && number) {
      console.log("getUserEmail1 =====> ");
      const res = await Apis.post(`user/search/${type}`, [name, number]);
      console.log("getUserEmail2 =====> ", res);

      if (res.success) {
        setUserEmail(res.value.email);
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
          async (rsp: any) => {
            if (rsp.success) {
              console.log("[res success1] ==> ", rsp);
              // 인증 성공 시 로직,
              let userAuth = await axios({
                url: "http://localhost:8080/user/certifications",
                method: "post",
                headers: { "Content-Type": "application/json" },
                data: { imp_uid: rsp.imp_uid },
              });

              console.log(
                "[res success2] ==> ",
                userAuth.data.response.name === name,
                userAuth.data.response.name,
                name
              );
              console.log(
                "[res success3] ==> ",
                userAuth.data.response.phone === number,
                userAuth.data.response.phone,
                number
              );
              if (
                userAuth.data.response.name === name &&
                userAuth.data.response.phone === number
              ) {
                console.log(
                  "[certification/userAuth] success res ==> ",
                  userAuth
                );
                let newEmail = maskingEmail(userEmail);

                console.log("maskingEmail@@@@@@@@@@@", maskingEmail(userEmail));
                console.log("maskingEmail@@@@@@@@@@@", newEmail);
                alert(
                  `인증이 성공했습니다.\n 회원님의 이메일 계정은 ${newEmail}입니다.`
                );
              } else {
                console.warn(
                  "[certification/userAuth] failure res ==> ",
                  userAuth
                );
                alert(
                  `인증에 실패하였습니다.\n 에러 내용: 회원정보와 인증정보가 일치하지 않습니다.`
                );
              }
            } else {
              console.warn("res fail ==> ", rsp);
              // 인증 실패 시 로직,
              alert(`인증에 실패하였습니다.\n 에러 내용: ${rsp.error_msg}`);
            }
          }
        );
      } else {
        alert("가입된 이력이 없습니다. 기타 문의는 고객센터로 연락바랍니다.");
      }
    }
  };

  return (
    <div className="w-full min-w-[1200px]">
      <div className="w-full">
        <div className="top w-full h-[764px] bg-[#f2f0ff] flex justify-center flex-col text-center text-[53px] font-bold font-josefin relative">
          <Container>
            <Box>
              <BoxHeader>이메일 찾기</BoxHeader>
              <BoxContent>
                <Description>
                  &quot;리뷰어에 가입된 성명과 휴대폰 번호를 입력 후, <br />
                  휴대폰 인증 성공 시, 가입된 이메일을 알려드립니다.&quot;
                </Description>
                <Form>
                  <div className="input-box">
                    <InputBoxTitle>성명</InputBoxTitle>
                    <InputBoxInput
                      name="email"
                      placeholder="박리뷰어"
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="input-box">
                    <InputBoxTitle>전화번호</InputBoxTitle>
                    <InputBoxInput
                      name="phone"
                      placeholder="010-xxxx-xxxx"
                      type="number"
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </div>
                  <Button onClick={(e: Event) => getUserEmail(e)}>
                    가입된 이메일 찾기
                  </Button>
                </Form>
              </BoxContent>
            </Box>
            <Box>
              <BoxHeader>비밀번호 찾기</BoxHeader>
              <BoxContent>
                <Description>
                  &quot;리뷰어에 가입된 이메일 주소를 입력하시면, <br />
                  비밀번호 재설정 메일을 전송해 드립니다.&quot;
                </Description>
                <Form>
                  <div className="input-box">
                    <InputBoxTitle>이메일</InputBoxTitle>
                    <InputBoxInput
                      name="email"
                      placeholder="ID@example.com"
                      type="text"
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </div>
                  <Button onClick={(e: Event) => getUserPassword(e)}>
                    비밀번호 재설정 메일 보내기
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
