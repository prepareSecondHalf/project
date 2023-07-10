import { NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";

const Reset: NextPage = () => {
  const submitReset = (type: string) => {
    console.log("submitReset");
  };
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

  return (
    <div className="w-full min-w-[1200px]">
      <div className="w-full">
        <div className="top w-full h-[764px] bg-[#f2f0ff] flex justify-center flex-col text-center text-[53px] font-bold font-josefin relative">
          <Container>
            <Box>
              <BoxHeader>이메일 찾기</BoxHeader>
              <BoxContent>
                <Description>
                  &quot;리뷰어에 가입된 성명과 휴대폰 번호를 입력하시면, <br />
                  가입된 이메일을 알려드립니다.&quot;
                </Description>
                <Form>
                  <div className="input-box">
                    <InputBoxTitle>성명</InputBoxTitle>
                    <InputBoxInput
                      name="email"
                      placeholder="박리뷰어"
                      type="text"
                    />
                  </div>
                  <div className="input-box">
                    <InputBoxTitle>전화번호</InputBoxTitle>
                    <InputBoxInput
                      name="phone"
                      placeholder="010-xxxx-xxxx"
                      type="number"
                    />
                  </div>
                  <Button onclick={() => submitReset} type="button">
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
                    />
                  </div>
                  <Button onclick={() => submitReset} type="button">
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
