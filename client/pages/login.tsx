import Footer from "components/Footer";
import Header from "components/Header";
import axios from 'axios';
import { NextPage } from "next";
import { BaseSyntheticEvent, useState } from "react";

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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(true);

  const handleLogout = (e: BaseSyntheticEvent) => {
    // axios.get("/api/user/logout")
    axios.get("/")
    .then((res) => {
      console.log('로그아웃 성공', res);
      setIsLoggedIn(false);
      setIsLoggedOut(true);
    }).catch((err) => {
      console.log('로그아웃 실패', err);
    })
  }
    
  const handleLogin = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      return alert('이메일 또는 패스워드를 확인해주세요');
    } else {
      let body = {
        email,
        password
      };

      axios.post("/login", body)
      .then((res) => {
        console.log('로그인 성공', res);
        setIsLoggedIn(true);
        setIsLoggedOut(false);

      }).catch((err) => {
        console.log('로그인 실패', err);
      })
    }


  }

  return (
    <div className="w-full min-w-[1200px]">
      {/* <Header /> */}
      <div className="w-full">
        <div className="top w-full h-[764px] bg-[#f2f0ff] flex justify-center flex-col text-center text-[53px] font-bold font-josefin relative">

          <>
            {!isLoggedIn 
            ? 
                // 로그인 화면
                <div className="login-wrapper">
                  <div className="title_wrapper">
                    <h2 style={titleStyle}>Login</h2>
                    <p style={subTitleStyle}>
                      Please login using account detail below
                    </p>
                  </div>

                  {/* email */}
                  <div className="id_wrapper">
                    <label htmlFor="id"></label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      style={accountInput}
                      type="email"
                      placeholder="Email Address"
                      id="id"
                    />
                  </div>

                  {/* password */}
                  <div className="password_wrapper">
                    <label htmlFor="password"></label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      style={accountInput}
                      type="password"
                      placeholder="Password"
                      id="password"
                    />
                  </div>

                  {/* button */}
                  <div className="request_user">
                    <p style={requestUserText}>Forget your password?</p>
                    <button 
                      onClick={handleLogin}
                      style={signinBtn} id="signin_btn">
                      Sign In
                    </button>
                    <p style={requestUserText}>
                      Don't have an Account? Create account
                    </p>
                  </div>
                </div>
                :
                // 로그인 성공
                <div className="login-wrapper">
                  <div className="title_wrapper">
                    <h2 style={titleStyle}>Login 성공</h2>
                    <p style={subTitleStyle}>
                      로그인 성공했다
                    </p>
                  </div>

                  {/* button */}
                  <div className="request_user">
                    <button 
                      onClick={handleLogout}
                      style={signinBtn} id="signin_btn">
                      Logout
                    </button>
                  </div>
                </div>
              }
            </>
        </div>
        {/* <div className="w-full h-[800px] bg-white text-center flex flex-col justify-center text-7xl">
                let's login page!!!!
            </div> */}
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Login;
