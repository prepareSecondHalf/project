import { NextPage } from "next";
import SideBar from "components/MyPage/MyPageSideBar";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Apis } from "utils/api";
import { useQuery } from "react-query";

import {
  Container,
  MyPageWrapper,
  MyPageContent,
} from "styles/myPage/myPageStyled";

const WithDrawBtnWrap = styled.div`
  width: 100%;
  text-align: right;
  margin-top: 1.5rem;
`;
const WithDrawBtn = styled.button`
  width: 70px;
  height: 57px;
  border-radius: 3px;
  background: #fb2e86;
  font-size: 12px;
  color: #000;
  font-weight: bold;
`;
const WithdrawTitle = styled.h2`
  line-height: 1;
  letter-spacing: -0.05em;
  font-size: 1.3rem;
  font-weight: 700;
`;
const WithdrawSubTitle = styled.p`
  margin: 2.5rem 0 1.4rem;
  line-height: 1;
  letter-spacing: -0.05em;
  font-size: 1.3rem;
  font-weight: 700;
`;
const WithdrawListWrap = styled.ul`
  margin-top: 2rem;
  word-break: keep-all;
`;
const WithdrawList = styled.li`
  padding: 1rem;
  min-height: 1.5rem;
`;

const Withdraw: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [loginType, setLoginType] = useState<string>("");
  const router = useRouter();

  const { data, error } = useQuery({
    queryKey: ["logInMutation"],
    // queryKey: ["logInMutation", "logOutMutation"],
    queryFn: async () => {
      const res = await Apis.get("http://localhost:8080/user/auth", {
        withCredentials: true,
      });
      return res;
    },
  });

  useEffect(() => {
    console.log("withdraw ===> ", data);
    setEmail(data?.data?.email);
    setLoginType(data?.data?.type);
  }, [data]);

  if (error) {
    return <div>Error: {error?.message}</div>;
  }

  // 회원 탈퇴 기능
  const handleWithDrawMember = async () => {
    console.log("handleWithDrawMember1>>>>>>>", email, document.cookie);
    // dropMemberMutation.mutate({ Id: Id });
    // (userInfo: loginParam) => Apis.post("/user/dropMember", { userInfo }),
    // Apis.delete("http://localhost:8080/user/close", id)
    // Apis.delete(`/user/close`, id)
    let confirmMsg = confirm("정말로 REVIEW 탈퇴를 하시겠습니까?");

    if (confirmMsg) {
      let result = await Apis.delete(`/user/close/${email}`);
      console.log("handleWithDrawMember2>>>>>>>", result);

      console.log("dropMember success1", result, document.cookie);
      if (result) {
        console.log("dropMember success2", result, document.cookie);

        document.cookie = "x_auth = GoogleCookie; max-age=0";
        document.cookie = `x_auth = ${document.cookie}; max-age=0;`;

        console.log("dropMember success3", result, document.cookie);
        alert("안전하게 회원 탈퇴가 이뤄졌습니다.");
        router.push("/");
      } else {
        console.log("dropMember fail", result);
      }
    }
  };

  return (
    <>
      {loginType === "normal" ? (
        <Container>
          <MyPageWrapper>
            <MyPageContent>
              <WithdrawTitle>회원탈퇴 개인정보의 파기</WithdrawTitle>
              <WithdrawSubTitle>
                REVIEWER(리뷰어)는 원칙적으로 개인정보 처리목적이 달성된
                개인정보는 지체없이 파기합니다.
              </WithdrawSubTitle>
              <WithdrawListWrap>
                <WithdrawList>
                  파기의 절차, 기한 및 방법은 다음과 같습니다. 1파기 절차 -
                  개인정보는 목적 달성 후 즉시 또는 별도의 공간에 옮겨져 내부
                  방침 및 기타 관련법령에 따라 일정기간 저장된 후 파기됩니다.
                  별도의 공간으로 옮겨진 개인정보는 법률에 의한 경우가
                  아니고서는 다른 목적으로 이용되지 않습니다.
                </WithdrawList>
                <WithdrawList>
                  파기 기한 및 파기 방법 - 보유기간이 만료되었거나 개인정보의
                  처리목적달성, 해당 업무의 폐지 등 그 개인정보가 불필요하게
                  되었을 때에는 지체없이 파기합니다. 전자적 파일형태의 정보는
                  기록을 재생할 수 없는 기술적 방법을 사용합니다. 종이에 출력된
                  개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.
                </WithdrawList>
              </WithdrawListWrap>

              <WithDrawBtnWrap>
                <WithDrawBtn onClick={handleWithDrawMember} id="withdraw_btn">
                  회원탈퇴
                </WithDrawBtn>
              </WithDrawBtnWrap>
            </MyPageContent>
          </MyPageWrapper>
        </Container>
      ) : (
        <Container>
          <MyPageWrapper>
            <MyPageContent>
              <WithdrawTitle>
                회원탈퇴 페이지는 소셜로그인 또는 비로그인 시 접근 불가입니다.
              </WithdrawTitle>
            </MyPageContent>
          </MyPageWrapper>
        </Container>
      )}
    </>
  );
};

export default Withdraw;
