import { NextPage } from "next";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Apis } from "utils/api";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const titleStyle = {
    fontSize: "32px",
    color: "#000",
  };
  const subTitleStyle = {
    fontSize: "17px",
    color: "#9096B2",
  };

  const accountInput = {
    width: "432px",
    height: "52px",
  };

  const requestUserText = {
    fontWeight: "400",
    fontSize: "17px",
    color: "#9096B2",
    marginTop: "10px",
  };

  const signinBtn = {
    width: "432px",
    height: "57px",
    borderRadius: "3px",
    background: "#FB2E86",
    fontSize: "17px",
    fontWeight: "700",
  };

  interface memberParam {
    email: string;
    password: string;
    birth: string;
    phone: string;
  }

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [birth, setBirth] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
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
      password: password,
      birth: birth,
      phone: phone,
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

  return (
    <div className="w-full min-w-[1200px]">
      <div className="w-full">
        <div className="top w-full h-[764px] bg-[#f2f0ff] flex justify-center flex-col text-center text-[53px] font-bold font-josefin relative">
          <div className="login-wrapper">
            <div className="title_wrapper">
              <h2 style={titleStyle}>Signup</h2>
              <p style={subTitleStyle}>
                Please signup using personal account detail below
              </p>
            </div>

            {/* <div className="id_wrapper">
                        <label htmlFor="id"></label>
                        <input style={accountInput} type="text" placeholder="4~20자리 / 영문, 숫자, 특수문자 '_' 사용가능" id="id" />
                    </div> */}
            <div className="email_wrapper">
              <label htmlFor="email"></label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                style={accountInput}
                type="email"
                placeholder="email@reviewer.co.kr"
                id="email"
              />
            </div>

            <div className="password_wrapper">
              <label htmlFor="password"></label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                style={accountInput}
                type="password"
                placeholder="8~16자리/영문 대소문자, 숫자, 특수문자 조합"
                id="password"
              />
            </div>

            <div className="password_check_wrapper">
              <label htmlFor="password_check"></label>
              <input
                style={accountInput}
                type="password"
                placeholder="8~16자리/영문 대소문자, 숫자, 특수문자 조합"
                id="password_check"
              />
            </div>

            <div className="birth_wrapper">
              <label htmlFor="birth"></label>
              <input
                onChange={(e) => setBirth(e.target.value)}
                style={accountInput}
                type="number"
                placeholder="YYYYMMDD"
                id="birth"
              />
            </div>

            <div className="phone_number_wrapper">
              <label htmlFor="phone_number"></label>
              <input
                onChange={(e) => setPhone(e.target.value)}
                style={accountInput}
                type="number"
                placeholder="'-' 빼고 숫자만 입력"
                id="phone_number"
              />
            </div>

            <div className="request_user">
              {/* <p style={requestUserText}>Forget your password?</p> */}
              <button
                onClick={() => handleSignUpBtn()}
                style={signinBtn}
                id="signup_complete_btn"
              >
                회원가입 완료
              </button>
              {/* <p style={requestUserText}>Don't have an Account? Create account</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
