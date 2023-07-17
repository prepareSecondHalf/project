/** hooks */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from 'react-query';
/** types */
import { IPost, ICreatePostReq } from 'interface/IFcPost';
/** utils */
import { Apis } from 'utils/api';
/** components */
import PostBanner from 'components/PostBoard/PostBanner';
import { Button } from 'components/PostBoard/Mixins';

const generateTempId = (): string => {
  return Math.random().toString();
};

const ReviewerList = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [lang, setLang] = useState('');
  const [langs, setLangs] = useState<String[]>([]);
  const [pricePerMin, setPricePerMin] = useState(0);
  const [alertMsg, setAlertMsg] = useState('');
  const [post, setPost] = useState<IPost>();
  const router = useRouter();
  // 수정 시에는 기존 데이터 불러오기
  const { isLoading, error, data } = useQuery('post', () => Apis.get(`/post`));
  const { mutate } = useMutation('post', () =>
    Apis.post('/post', {
      title,
      contents,
      register_date: new Date(),
      lang: langs,
      per_minute: pricePerMin,
      creator: 'ksg',
    })
  );
  useEffect(() => {
    if (!!data && !!data.post) {
      setPost(data.post);
    }
  }, [data]);

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const onChangeContents = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };
  const onChangeLang = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLang(event.target.value);
  };
  const onAddLang = (event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
    if (event.type !== 'click') {
      event.preventDefault();
      if ((event as React.KeyboardEvent<HTMLInputElement>).key !== 'Enter') return;
    }
    if (!lang) return;
    setLangs((prevLangs) => [...prevLangs.filter((prevLang) => prevLang !== lang), lang]);
    setLang('');
  };
  const onChangePricePerMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPricePerMin(+event.target.value);
  };
  const closeAlert = () => {
    setAlertMsg('');
  };
  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation();
  const onSubmitForm = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const isValid = [title, contents].every((item) => !!item) && langs.length > 0;
    if (!isValid) {
      setAlertMsg('필수값을 입력하세요');
      return;
    }

    mutate();
    router.push('http://localhost:3000/reviewerlist');
  };

  if (isLoading)
    return (
      <div className="w-full h-16 rounded border-white outline-none text-lg bg-[#EEEFFB]">L O A D I N G . . .</div>
    );

  if (error) {
    console.log(error);
    return;
  }
  if (data) {
    console.log('i got data', data);
  }

  return (
    <>
      <PostBanner>
        <h1>리뷰를 광고하세요</h1>
      </PostBanner>
      <main className="w-full h-fit px-96 bg-[#ffffff]">
        <section className="flex justify-between items-center py-20 text-[#8A8FB9]">
          <div className="w-full px-20 py-20 bg-[#EEEFFB]">
            <h1 className="text-[40px] font-bold mb-20">글을 올려 보아라</h1>
            <label htmlFor="title">
              <input
                type="text"
                id="title"
                className="w-full h-16 mb-8 rounded border-white outline-none text-lg"
                placeholder="제목 입력"
                value={title}
                onChange={onChangeTitle}
              />
            </label>
            <label htmlFor="contents">
              <textarea
                id="contents"
                className="w-full h-96 mb-8 rounded border-white outline-none resize-none text-lg"
                placeholder="내용 입력"
                value={contents}
                onChange={onChangeContents}
              />
            </label>
            <div className="w-full flex gap-4">
              <label htmlFor="lang" className="w-4/12">
                <input
                  type="text"
                  id="lang"
                  className="w-full h-16 mb-8 rounded border-white outline-none text-lg"
                  placeholder="언어를 추가하세요"
                  value={lang}
                  onChange={onChangeLang}
                  onKeyUp={onAddLang}
                />
              </label>
              <Button type="button" onClick={onAddLang}>
                add
              </Button>
              <label htmlFor="pricePerMin" className="w-6/12 relative">
                <input
                  type="number"
                  step="100"
                  id="pricePerMin"
                  className="w-full h-16 mb-8 rounded border-white outline-none text-lg"
                  placeholder="가격"
                  value={pricePerMin}
                  onChange={onChangePricePerMin}
                />
                <span className="ml-2 text-lg absolute right-12 top-1/3 -translate-y-1/2">원</span>
              </label>
            </div>
            <ul className="h-16 flex flex-wrap gap-x-4">
              {langs.map((lang) => {
                return (
                  <li
                    className="w-fit h-2/5 flex items-center px-4 bg-[#1BE982] text-[#EEEFFB] text-sm rounded border-white"
                    key={lang + generateTempId()}
                  >
                    {lang}
                  </li>
                );
              })}
            </ul>

            <Link href={'reviewerlist'}>
              <Button type="button">취소하기</Button>
            </Link>
            <Button type="submit" onClick={onSubmitForm}>
              등록하기
            </Button>
          </div>
        </section>

        {alertMsg && (
          <div className="fixed top-0 bottom-0 left-0 right-0 bg-slate-400 backdrop-opacity-30" onClick={closeAlert}>
            <div
              className="w-96 h-96 bg-slate-100 relative inset-2/4 translate-x-[-50%] translate-y-[-50%]"
              onClick={stopPropagation}
            >
              {alertMsg}
              <Button type="button" onClick={closeAlert}>
                확인
              </Button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default ReviewerList;
