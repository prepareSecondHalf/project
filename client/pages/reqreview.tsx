/** hooks */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from 'react-query';
/** types */
import { IPost, ICreatePostReq } from 'interface/IFcPost';
/** utils */
import { Apis } from 'utils/api';
import PostBanner from 'components/PostBoard/PostBanner';

const ReqReview = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [post, setPost] = useState<IPost>();
  // const [lang, setLang] = useState('');
  const router = useRouter();
  const pid = router.query.pid;
  // const { isLoading, error, data } = useQuery('post', () => Apis.get(`/post`, { id: pid }));
  const { isLoading, error, data } = useQuery('post', () => Apis.get(`/post/${pid}`));
  console.log(router);

  useEffect(() => {
    if (!!data && !!data.post) {
      setPost(data.post);
    }
  }, [data]);

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
        <h1>리뷰를 신청하세요.</h1>
      </PostBanner>
      <main className="w-full h-fit px-96 bg-[#ffffff]">
        <label htmlFor="title">
          <input
            type="text"
            id="title"
            className="w-full h-16 mb-8 rounded border-white outline-none text-lg"
            placeholder="제목 입력"
          />
        </label>
        <fieldset>
          <legend>언어 선택!</legend>
          {data?.post?.lang?.map((lang: string) => {
            return (
              <>
                <span>{lang}</span>
                <label htmlFor={lang} key={lang}>
                  <input
                    type="radio"
                    id={lang}
                    value={lang}
                    className="w-full h-16 mb-8 rounded border-white outline-none text-lg"
                  />
                </label>
              </>
            );
          })}
        </fieldset>
        <label htmlFor="contents">
          <textarea
            id="contents"
            className="w-full h-96 mb-8 rounded border-white outline-none resize-none text-lg"
            placeholder="내용 입력"
          />
        </label>
        <label htmlFor="title">
          <input
            type="text"
            id="title"
            className="w-full h-16 mb-8 rounded border-white outline-none text-lg"
            placeholder="파일 첨부"
          />
        </label>
        <div>리뷰어가 승인하면 채팅방이 열립니다!</div>
      </main>
    </>
  );
};

export default ReqReview;
