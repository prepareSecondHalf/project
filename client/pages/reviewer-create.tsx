/** hooks */
import { useState } from 'react';

/**components */
import Header from 'components/Header';
import Footer from 'components/Footer';

/** libs */
import axios from 'axios';

/** interface */
interface IPost {
  id: String;
  title: String;
  contents: String;
  register_date: Date;
  lang: String[];
  per_minute: Number;
  comments?: Object[];
  creator: String;
}

const ReviewerList = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [language, setLanguage] = useState('');
  const [pricePerMin, setPricePerMin] = useState(0);

  const onChangeTitle = () => {
    console.log('아직 아무것도 안 함');
  };
  const onChangeContents = () => {
    console.log('아직 아무것도 안 함');
  };
  const onChangeLanguage = () => {
    console.log('아직 아무것도 안 함');
  };
  const onChangePricePerMin = () => {
    console.log('아직 아무것도 안 함');
  };

  const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params: IPost = {
      id: '123',
      title: '되니?',
      contents: '테스트하려고 만들었읍니다',
      register_date: new Date(),
      lang: ['trash languages like', 'LWC', 'Aura'],
      per_minute: 100,
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
      <Header />
      <main className="w-full h-fit px-96 bg-[#ffffff] font-josefin">
        <section className="flex justify-between items-center py-20 text-[20px]">
          <form className="w-full px-20 py-20 bg-[#ebdefc]" onSubmit={onSubmitForm}>
            <h1 className="text-[40px] font-josefin font-bold">create a post</h1>
            <div>
              <label htmlFor="title">title</label>
              <input type="text" id="title" value={title} onChange={onChangeTitle} />
            </div>
            <div>
              <label htmlFor="contents">contents</label>
              <textarea id="contents" value={contents} onChange={onChangeContents} />
            </div>
            <div>
              <label htmlFor="language">language</label>
              <input type="text" id="language" value={language} onChange={onChangeLanguage} />
            </div>
            <div>
              <label htmlFor="pricePerMin">pricePerMin</label>
              <input type="number" id="pricePerMin" value={pricePerMin} onChange={onChangePricePerMin} />
            </div>
            <button type="submit">submit!</button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ReviewerList;
