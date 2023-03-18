import Footer from 'components/Footer';
import Header from 'components/Header';
import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="w-full min-w-[1200px]">
      <Header />
      <div className="w-full">
        <div className="top w-full h-[764px] bg-[#f2f0ff] flex justify-center flex-col text-center text-[53px] font-bold font-josefin relative">
          Best Reviewer List!!!
        </div>
        <div className="w-full h-[800px] bg-white text-center flex flex-col justify-center text-7xl">
          SectionSection!!!!
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
