/** Hooks */
import { Key, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

/** libs */
import Link from 'next/link';
import axios from 'axios';

/** types */
import { IPost } from 'interface/IFcPost';
import { Apis } from 'utils/api';

const ReviewerList = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [keyword, setKeyword] = useState('');

  // get > useQuery
  const { isLoading, error, data } = useQuery('post', () => axios.get('http://localhost:8080/api/post/'), {
    onSuccess: (res) => {
      console.log('check reponse', res);
      const sortedPosts = res?.data?.posts.sort((a: IPost, b: IPost) => {
        return new Date(b.register_date).getTime() - new Date(a.register_date).getTime();
      });
      console.log('sorted post', sortedPosts);
      setPosts(sortedPosts);
    },
  });

  if (isLoading) return <div>L O A D I N G . . .</div>;

  if (error) {
    console.log(error);
    return;
  }
  if (data) {
    console.log('we got data', data);
  }

  // useEffect(() => {
  //   const getPosts = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8080/api/post/');
  //       console.log('i got a reponse!', response);
  //       const sortedPosts = response?.data?.posts.sort((a: IPost, b: IPost) => {
  //         return new Date(b.register_date).getTime() - new Date(a.register_date).getTime();
  //       });
  //       console.log('sorted post', sortedPosts);
  //       setPosts(sortedPosts);
  //       console.log('sorted post', posts);
  //     } catch (error) {
  //       console.log('error occured!!');
  //       console.dir(error);
  //     }
  //   };
  //   getPosts();
  // }, []);

  // const onClickCreatePost = () => {
  //   console.log('will create!');
  // };

  const onChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };
  const onSubmitKeyword = (event: React.FormEvent) => {
    // get!
    event.preventDefault();
    console.log(`searched by ${keyword}`);
    axios.get('http://localhost:8080/api/post/', { params: { keyword } }).then((res) => {
      console.log('filtered', res);
      const sortedPosts = res?.data?.posts.sort((a: IPost, b: IPost) => {
        return new Date(b.register_date).getTime() - new Date(a.register_date).getTime();
      });
      console.log('sorted post', sortedPosts);
      setPosts(sortedPosts);
    });
  };

  return (
    <>
      <section className="w-full px-96 py-20 bg-[#EEEFFB] text-[40px] font-josefin font-bold">
        <h1>Banner of the List</h1>
      </section>
      <main className="w-full h-fit px-96 bg-[#ffffff] font-josefin">
        <section className="flex justify-between items-center py-20 text-[20px]">
          <div className="text-[32px] font-bold">Conditions</div>
          <div className="flex">
            <div className="mr-8 bg-[#EEEFFB]">정렬 Radio button</div>
            <div className="mr-8 bg-[#EEEFFB]">언어 Select box</div>
            <form className="mr-8" onSubmit={onSubmitKeyword}>
              <label htmlFor="search">
                <input
                  type="text"
                  id="search"
                  className="w-full h-16 mb-8 rounded border-white outline-none text-lg bg-[#EEEFFB]"
                  placeholder="검색어 입력"
                  value={keyword}
                  onChange={onChangeKeyword}
                />
              </label>
              <button type="submit" className="bg-[#EEEFFB]">
                검색
              </button>
            </form>
            <Link href="/reviewer-create">등록하기</Link>
          </div>
        </section>
        <section>
          {posts.map((post) => {
            return (
              <Link
                href={`reviewerpost/${post._id}`}
                key={post._id as Key}
                className="w-full flex mb-16 cursor-pointer"
              >
                <div className="w-72 h-60 bg-[#EEEFFB]">Image of the Reviewer</div>
                <div className="p-8">
                  <div>{post.creator}</div>
                  <div className="flex gap-x-4">
                    <div>Price: {`${post.per_minute}원`}</div>
                    <div>
                      Language:
                      {post.lang?.map((lang, idx) => {
                        return <span key={`${lang}${idx}`}>{idx === 0 ? lang : `, ${lang}`}</span>;
                      })}
                    </div>
                  </div>
                  <div>{post.contents}</div>
                </div>
              </Link>
            );
          })}
        </section>
      </main>
    </>
  );
};

export default ReviewerList;
