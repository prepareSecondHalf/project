/** React, Hooks */
import { Key, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Link from 'next/link';
/** types */
import { IPost } from 'interface/IFcPost';
/** utils */
import { Apis } from 'utils/api';
/** components */
import PostBanner from 'components/PostBoard/PostBanner';
import PostListItem from 'components/PostBoard/PostListItem';
import { Button } from 'components/PostBoard/Mixins';

const getPostsSortedByDate = (data: IPost[], descending: boolean) => {
  const isDescending = descending ? 1 : -1;
  return data.sort((a: IPost, b: IPost) => {
    return isDescending * (new Date(b.register_date).getTime() - new Date(a.register_date).getTime());
  });
};

const ReviewerList = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [keyword, setKeyword] = useState('');
  const [isDescending, setIsDescending] = useState(false);

  // get > useQuery
  const { isLoading, error, data, refetch } = useQuery('post', () => Apis.get('/post', { params: { keyword } }), {});

  // 이게 맞냐?
  useEffect(() => {
    if (!!data && !!data.posts) {
      const sortedPosts = getPostsSortedByDate(data.posts, true);
      setPosts(sortedPosts);
    }
  }, [data]);

  useEffect(() => {
    const sortedPosts = getPostsSortedByDate(posts, isDescending);
    setPosts(sortedPosts);
  }, [isDescending]);

  if (isLoading) return <div>L O A D I N G . . .</div>;

  if (error) {
    console.log(error);
    return;
  }
  if (data) {
    console.log('we got data', data);
  }

  const onChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => setKeyword(event.target.value);
  const onSubmitKeyword = (event: React.FormEvent) => {
    event.preventDefault();
    refetch();
  };
  const onClickDescendingSort = () => setIsDescending(true);
  const onClickAscendingSort = () => setIsDescending(false);

  return (
    <>
      <PostBanner>
        <h1>원하는 리뷰를 찾으세요</h1>
      </PostBanner>
      <main className="w-full h-fit px-96 bg-[#ffffff] font-josefin">
        <section className="flex justify-between items-center py-20 text-[20px]">
          <div className="text-[32px] font-bold">Conditions</div>
          <div className="flex">
            <div>
              <Button onClick={onClickDescendingSort}>최신순</Button>
              <Button onClick={onClickAscendingSort}>오래된순</Button>
            </div>
            <form className="flex gap-4" onSubmit={onSubmitKeyword}>
              <label htmlFor="search">
                <input
                  type="text"
                  id="search"
                  className="w-full h-16 rounded border-white outline-none text-lg bg-[#EEEFFB]"
                  placeholder="검색어 입력"
                  value={keyword}
                  onChange={onChangeKeyword}
                />
              </label>
              <Button type="submit">검색</Button>
            </form>
            <Link href="/reviewer-create">
              <Button>등록하기</Button>
            </Link>
          </div>
        </section>
        <section>
          {posts && posts.map((post) => <PostListItem post={post} key={post._id as Key}></PostListItem>)}
        </section>
      </main>
    </>
  );
};

export default ReviewerList;
