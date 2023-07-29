/** hooks */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from 'react-query';
/** types */
import { IPost, ICreatePostReq } from 'interface/IFcPost';
/** utils */
import { Apis } from 'utils/api';
import PostBanner from 'components/PostBoard/PostBanner';
import { Button, TitleInput } from 'components/PostBoard/Mixins';

const ReqReview = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [lang, setLang] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [alertMsg, setAlertMsg] = useState('');
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

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const onChangeLang = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLang(event.target.value);
  };
  const onChangeContents = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };
  const onChangeFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    const targetFile = event.target.files![0];
    console.log('your files', targetFile);
    setFiles((prevFiles) => {
      const duplicated = prevFiles.find((file) => file.name === targetFile.name);
      return !!duplicated ? prevFiles : [...prevFiles, targetFile];
    });
  };
  const onClickRemoveFile = (event: React.MouseEvent<HTMLButtonElement>) => {
    const targetId = event.currentTarget.id;
    console.log(`what is target`, targetId);
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== targetId));
  };

  const onSubmitReq = () => {
    if (!title) {
      setAlertMsg('title');
      return;
    }
    if (!lang) {
      setAlertMsg('lang');
      return;
    }
    if (!contents) {
      setAlertMsg('contents');
      return;
    }
    if (!files || files.length === 0) {
      setAlertMsg('files');
      return;
    }

    console.log(`title: ${title}`);
    console.log(`lang: ${lang}`);
    console.log(`contents: ${contents}`);
    console.log(`files: ${files.map((file) => file.name)}`);
  };

  const closeAlert = () => {
    setAlertMsg('');
  };
  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation();

  return (
    <>
      <PostBanner>
        <h1>리뷰를 신청하세요.</h1>
      </PostBanner>
      <main className="w-full h-fit px-96 bg-[#ffffff]">
        <div className="p-16 bg-[#EEEFFB]">
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
          <fieldset>
            <legend>언어 선택!</legend>
            {data?.post?.lang?.map((lang: string) => {
              return (
                <>
                  <span>{lang}</span>
                  <label htmlFor={lang} key={lang}>
                    <input type="radio" name="lang" id={lang} value={lang} onChange={onChangeLang} />
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
              onChange={onChangeContents}
            />
          </label>
          <label htmlFor="file">
            이미지만 첨부 가능!
            <input
              type="file"
              id="file"
              accept="image/*"
              className="w-full h-16 mb-8 rounded border-white outline-none text-lg"
              placeholder="파일 첨부"
              onChange={onChangeFiles}
            />
          </label>
          <div className="flex">
            <p>uploaded:</p>
            {files &&
              files.map((file, idx) => {
                return idx === 0 ? (
                  <span key={file.name}>
                    {file.name}
                    <button id={file.name} onClick={onClickRemoveFile}>
                      X
                    </button>
                  </span>
                ) : (
                  <span key={file.name}>
                    , {file.name}
                    <button id={file.name} onClick={onClickRemoveFile}>
                      X
                    </button>
                  </span>
                );
              })}
          </div>
          <div className="flex">
            <Button onClick={onSubmitReq}>신청하기</Button>
            <div>리뷰어가 승인하면 채팅방이 열립니다!</div>
          </div>
        </div>
      </main>

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
    </>
  );
};

export default ReqReview;
