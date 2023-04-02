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
                        <h2 style={titleStyle}>Login</h2>
                        <p style={subTitleStyle}>Please login using account detail below</p>
                    </div>
                    
                    <div className="id_wrapper">
                        <label htmlFor="id"></label>
                        <input style={accountInput} type="text" placeholder='Email Address' id="id" />
                    </div>

                    <div className="password_wrapper">
                        <label htmlFor="password"></label>
                        <input style={accountInput} type="password" placeholder='Password' id="password" />
                    </div>

                    <div className="request_user">
                        <p style={requestUserText}>Forget your password?</p>
                        <button style={signinBtn} id="signin_btn">Sign In</button>
                        <p style={requestUserText}>Don't have an Account? Create account</p>
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