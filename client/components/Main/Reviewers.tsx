import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';

const reviewers = [
  {
    _id: 0,
    img: 'ImgSection',
    nickname: '정환',
    description: '우리는 존~~나 짱이다',
    langs: ['python', 'js'],
  },
  {
    _id: 1,
    img: 'ImgSection',
    nickname: '승규',
    description: '우리는 존~~나 짱이다',
    langs: ['python'],
  },
  {
    _id: 2,
    img: 'ImgSection',
    nickname: '희수',
    description: '우리는 존~~나 짱이다',
    langs: ['python', 'js', 'c++'],
  },
  {
    _id: 3,
    img: 'ImgSection',
    nickname: '진우',
    description: '우리는 존~~나 짱이다',
    langs: ['js', '.net'],
  },
  {
    _id: 4,
    img: 'ImgSection',
    nickname: '제혁',
    description: '우리는 존~~나 짱이다',
    langs: ['python', 'js', 'go'],
  },
];

const Reviewers: NextPage = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const onClickPagination = (e: React.MouseEvent<HTMLElement>) => {
    setActiveIdx(parseInt(e.currentTarget.dataset.key as string));
  };

  const paginationUI = () => {
    let itemLen =
      reviewers.length % 4 === 0
        ? Math.floor(reviewers.length / 4)
        : Math.floor(reviewers.length / 4) + 1;

    let returnArr = [];

    for (let i = 0; i < itemLen; i++) {
      returnArr.push(
        <div
          key={i}
          className={`w-4 h-1 bg-[#febad7] rounded-[10px] cursor-pointer ${
            i === activeIdx ? 'w-6 bg-[#fb2e86]' : ''
          }`}
          data-key={i}
          data-active={i === activeIdx}
          onClick={onClickPagination}
        ></div>,
      );
    }

    return returnArr;
  };

  return (
    <div className="w-full mt-[200px]">
      <div className="text-darkblue font-bold text-[40px] text-center font-josefin mb-[53px]">
        Reviewers
      </div>
      <div className="w-full h-fit flex justify-center">
        <div className="w-full max-w-[1192px] overflow-hidden">
          <div
            className={`flex w-fit h-[384px] justify-center relative ${
              activeIdx === 0 ? 'left-[12px]' : '-left-[1188px]'
            } transition-all duration-[800ms]`}
          >
            {Array.isArray(reviewers)
              ? reviewers.map((item) => (
                  <div
                    className="w-[270px] h-[360px] mr-[30px] text-white shadow-md cursor-pointer relative top-3 box-border hover:border hover:border-solid hover:border-[#2f1ac4]"
                    key={item._id}
                  >
                    <Link href="#">
                      <div className="w-full h-3/5 bg-[#f6f7fb] flex justify-center flex-col text-center text-xl font-josefin px-3 py-0">
                        {item.img}
                      </div>
                      <div className="w-full h-2/5 text-center flex justify-center flex-col px-3 py-0">
                        <div className="h-fit">
                          <div className="font-lato text-lg text-basered font-bold">
                            {item.nickname}
                          </div>
                          <div className="font-josefin text-sm text-darkblue mt-3">
                            {item.description}
                          </div>
                          <div className="w-full flex justify-center gap-2">
                            {item.langs.map((lang) => (
                              <div
                                key={lang}
                                className="font-josefin text-sm text-darkblue mt-2"
                              >
                                {lang}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              : ''}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center mt-12">
        <div className="flex w-fit gap-1.5">{paginationUI()}</div>
      </div>
    </div>
  );
};

export default Reviewers;
