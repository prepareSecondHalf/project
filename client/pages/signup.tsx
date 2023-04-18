import Footer from 'components/Footer';
import Header from 'components/Header';
import { NextPage } from 'next';


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
        width: '432px',
        height: '57px',
        borderRadius: '3px',
        background: '#FB2E86',
        fontSize: '17px',
        fontWeight: '700',
    }


    return (
    <div className='w-full min-w-[1200px]'>
        <Header />
        <div className="w-full">
            <div className="top w-full h-[764px] bg-[#f2f0ff] flex justify-center flex-col text-center text-[53px] font-bold font-josefin relative">
                <div className="login-wrapper">
                    <div className="title_wrapper">
                        <h2 style={titleStyle}>Signup</h2>
                        <p style={subTitleStyle}>Please signup using personal account detail below</p>
                    </div>
                    
                    <div className="id_wrapper">
                        <label htmlFor="id"></label>
                        <input style={accountInput} type="text" placeholder="4~20자리 / 영문, 숫자, 특수문자 '_' 사용가능" id="id" />
                    </div>

                    <div className="password_wrapper">
                        <label htmlFor="password"></label>
                        <input style={accountInput} type="password" placeholder='8~16자리/영문 대소문자, 숫자, 특수문자 조합' id="password" />
                    </div>

                    <div className="password_check_wrapper">
                        <label htmlFor="password_check"></label>
                        <input style={accountInput} type="password" placeholder='8~16자리/영문 대소문자, 숫자, 특수문자 조합' id="password_check" />
                    </div>

                    <div className="birth_wrapper">
                        <label htmlFor="birth"></label>
                        <input style={accountInput} type="number" placeholder='YYYYMMDD' id="birth" />
                    </div>
                    
                    <div className="phone_number_wrapper">
                        <label htmlFor="phone_number"></label>
                        <input style={accountInput} type="number" placeholder="'-' 빼고 숫자만 입력"  id="phone_number" />
                    </div>
                    
                    <div className="email_wrapper">
                        <label htmlFor="email"></label>
                        <input style={accountInput} type="email" placeholder='email@reviewer.co.kr' id="email" />
                    </div>
                    
                    <div className="request_user">
                        {/* <p style={requestUserText}>Forget your password?</p> */}
                        <button style={signinBtn} id="signup_complete_btn">회원가입 완료</button>
                        {/* <p style={requestUserText}>Don't have an Account? Create account</p> */}
                    </div>
                </div>
            </div>
            {/* <div className="w-full h-[800px] bg-white text-center flex flex-col justify-center text-7xl">
                let's login page!!!!
            </div> */}
        <Footer />
        </div>
    </div>
    );
;}

export default Login;