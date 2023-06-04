import { NextPage } from 'next';
import axios from "axios";
import { useDispatch } from "react-redux";
import { registerUser } from "../_actions/user_action";
// import { registerUser } from '../../../_actions/user_action';
import { BaseSyntheticEvent, useState } from "react";
import { useRouter } from 'next/navigation';

const Login: NextPage = () => {
    const titleStyle = {
        fontSize: '32px',
        color: '#000',
    }
    const subTitleStyle = {
        fontSize: '17px',
        color: '#9096B2',
    }

    const accountInput = {
        width: '432px',
        height: '52px'
    }

    const requestUserText = {
        fontWeight: '400',
        fontSize: '17px',
        color: '#9096B2',
        marginTop: '10px',
    }

    const signinBtn = {
        width: '331px',
        height: '57px',
        borderRadius: '3px',
        background: '#FB2E86',
        fontSize: '17px',
        fontWeight: '700',
    }

    const labelStyle = {
        fontWeight: 'bold',
        fontSize: '22px',
        color: '#000',
        marginRight: '10px',
    }

    const signupBtnStyle = {
    //     maxWidth: '100%',
    //     textAlign: 'center',
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [birth, setBirth] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
  
    const dispatch = useDispatch();
    const router = useRouter();

    const onSubmitHandler = (e: BaseSyntheticEvent) => {
        e.preventDefault();

        console.log('email: ', email);
        console.log('password: ', password);
        console.log('confirmPassword: ', confirmPassword);
        console.log('passwordCheck: ', password == confirmPassword);
        console.log('birth: ', birth);
        console.log('phoneNumber: ', phoneNumber);

        if(password !== confirmPassword){
            return alert('Please check your password!');
        }
    
        let body={
          email: email,
          password: password,
          birth: birth,
          phoneNumber: phoneNumber
        }
    
        dispatch(registerUser(body))
        .then(response => {
            console.log("response>>>>", response);
            console.log("response>>>>", response.payload);

            console.log(response.payload.success);
            console.log(response.payload.register);
          if(response.payload.success){
            router.push('/login');
          } else{
            alert('Fail to Register OR Error');
          }
        }) 
      }

    return (
    <div className='w-full min-w-[1200px]'>
        {/* <Header /> */}
        <div className="w-full">
            <div className="top w-full h-[764px] bg-[#f2f0ff] flex justify-center flex-col text-center text-[53px] font-bold font-josefin relative">
                <div className="login-wrapper">
                    <div className="title_wrapper">
                        <h2 style={titleStyle}>Signup</h2>
                        <p style={subTitleStyle}>Please signup using personal account detail below</p>
                    </div>
                    
                    {/* <div className="id_wrapper">
                        <label htmlFor="id"></label>
                        <input style={accountInput} type="text" placeholder="4~20자리 / 영문, 숫자, 특수문자 '_' 사용가능" id="id" />
                    </div> */}
                    <div className="email_wrapper">
                        <div style={signupBtnStyle}>
                            <label htmlFor="email"><span style={labelStyle}>이메일 : </span></label>
                            <input 
                            onChange={(e) => setEmail(e.target.value)}
                            style={accountInput} type="email" placeholder='email@reviewer.co.kr' id="email" />
                        </div>
                    </div>

                    <div className="password_wrapper">
                        <div style={signupBtnStyle}>
                            <label htmlFor="password"><span style={labelStyle}>비밀번호 : </span></label>
                            <input 
                            onChange={(e) => setPassword(e.target.value)}
                            style={accountInput} type="password" placeholder='8~16자리/영문 대소문자, 숫자, 특수문자 조합' id="password" />
                        </div>
                    </div>

                    <div className="password_check_wrapper">
                        <div style={signupBtnStyle}>
                            <label htmlFor="password_check"><span style={labelStyle}>비밀번호 확인 : </span></label>
                            <input 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={accountInput} type="password" placeholder='8~16자리/영문 대소문자, 숫자, 특수문자 조합' id="password_check" />
                        </div>
                    </div>

                    <div className="birth_wrapper">
                        <div style={signupBtnStyle}>
                            <label htmlFor="birth"><span style={labelStyle}>생년월일 : </span></label>
                            <input 
                            onChange={(e) => setBirth(e.target.value)}
                            style={accountInput} type="number" placeholder='YYYYMMDD' id="birth" />
                        </div>
                    </div>
                    
                    <div className="phone_number_wrapper">
                        <div style={signupBtnStyle}>
                            <label htmlFor="phone_number"><span style={labelStyle}>전화번호 : </span></label>
                            <input 
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            style={accountInput} type="text" placeholder="'-' 포함해 입력"  id="phone_number" />
                        </div>
                    </div>
                    
                    <div className="request_user">
                        <div style={signupBtnStyle}>
                            {/* <p style={requestUserText}>Forget your password?</p> */}
                            <button 
                                onClick={onSubmitHandler}
                                style={signinBtn} id="signup_complete_btn">회원가입 완료</button>
                        </div>
                        {/* <p style={requestUserText}>Don't have an Account? Create account</p> */}
                    </div>
                </div>
            </div>
            {/* <div className="w-full h-[800px] bg-white text-center flex flex-col justify-center text-7xl">
                let's login page!!!!
            </div> */}
        {/* <Footer /> */}
        </div>
    </div>
    );
;}

export default Login;