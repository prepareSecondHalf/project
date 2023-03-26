import Footer from 'components/Footer';
import Header from 'components/Header';
import { NextPage } from 'next';

const Login: NextPage = () => {
    return (
    <div className='w-full min-w-[1200px]'>
        <Header />
        <div className="w-full">
            <div className="top w-full h-[764px] bg-[#f2f0ff] flex justify-center flex-col text-center text-[53px] font-bold font-josefin relative">
                login page!!!
            </div>
            <div className="w-full h-[800px] bg-white text-center flex flex-col justify-center text-7xl">
                let's login page!!!!
            </div>
        <Footer />
        </div>
    </div>
    );
;}

export default Login;