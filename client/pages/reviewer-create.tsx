/** hooks */
import React, { useState } from 'react';

/** libs */
import axios from 'axios';

/** interface */
interface ICreatePostReq {
  title: String;
  contents: String;
  register_date: Date;
  lang: String[];
  per_minute: Number;
  comments?: Object[];
  creator: String;
}
const generateId = (): string => {
  return Math.random().toString();
};

const ReviewerList = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [lang, setLang] = useState('');
  const [langs, setLangs] = useState<String[]>([]);
  const [pricePerMin, setPricePerMin] = useState(0);

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

  const onSubmitForm = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const params: ICreatePostReq = {
      title,
      contents,
      register_date: new Date(),
      lang: langs,
      per_minute: pricePerMin,
      creator: 'ksg',
    };
    try {
      console.log('where is response???');
      const response = await axios.post('http://localhost:8080/api/post/', params);
      console.log('this is response', response);
    } catch (error) {
      console.log('error occured!!');
      console.dir(error);
    }
  };
  return (
    <>
      <section className="w-full px-96 py-20 bg-[#EEEFFB] text-[40px] font-josefin font-bold">
        <h1>Create a post</h1>
      </section>
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
              <button
                type="button"
                className="w-fit h-16 px-12 bg-[#FB2E86] text-[#FFFFFF] text-xl rounded font-josefin"
                onClick={onAddLang}
              >
                add
              </button>
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
                    key={lang + generateId()}
                  >
                    {lang}
                  </li>
                );
              })}
            </ul>

            <button
              type="submit"
              className="w-fit h-16 px-12 block float-right	bg-[#FB2E86] text-[#FFFFFF] rounded text-xl font-josefin"
              onClick={onSubmitForm}
            >
              등록하기
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default ReviewerList;
