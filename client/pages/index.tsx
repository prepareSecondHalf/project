import Reviewers from 'components/Main/Reviewers';
import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="w-full min-w-[1200px]">
      <div className="w-full">
        <div className="top w-full h-[764px] bg-[#f2f0ff] flex justify-center flex-col text-center text-[53px] font-bold font-josefin relative">
          Best Reviewer List!!!
        </div>
        <div className="w-full h-[800px] bg-white text-center flex flex-col justify-center text-7xl">
          <Reviewers />
        </div>
      </div>
    </div>
  );
};

export default Home;
