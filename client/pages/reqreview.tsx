/** hooks */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from 'react-query';
/** types */
import { IPost, ICreatePostReq } from 'interface/IFcPost';
/** utils */
import { Apis } from 'utils/api';
import PostBanner from 'components/PostBoard/PostBanner';

const generateTempId = (): string => {
  return Math.random().toString();
};

const ReqReview = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [lang, setLang] = useState('');

  return (
    <>
      <PostBanner>
        <h1>리뷰를 신청하세요.</h1>
      </PostBanner>
      <main className="w-full h-fit px-96 bg-[#ffffff]">리뷰 신청하세욧</main>
    </>
  );
};

export default ReqReview;
