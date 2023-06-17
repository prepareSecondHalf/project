/** React, Hooks */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Link from 'next/link';
/** types */
import { IPost } from 'interface/IFcPost';
/** utils */
import { Apis } from 'utils/api';
import PostBanner from 'components/PostBoard/PostBanner';
import Modal from './Modal';

const PostItemModal = () => {
  const [post, setPost] = useState<IPost>();
  const router = useRouter();
  const pid = (router.query.reviewerpost as string[])[1];

  const { isLoading, error, data } = useQuery('post', () => Apis.get(`/post/${pid}`));

  useEffect(() => {
    if (!!data && !!data.post) {
      setPost(data.post);
    }
  }, [data]);

  if (isLoading) return <div>L O A D I N G . . .</div>;

  if (error) {
    console.log(error);
    return;
  }
  if (data) {
    console.log('i got data', data);
  }

  return (
    <Modal>
      <PostBanner>
        <h1>리뷰 상세입니당</h1>
      </PostBanner>
      <main className="w-full h-fit px-96 bg-[#ffffff]">
        <section className="flex justify-between items-center py-20 text-[#8A8FB9]">
          <div className="w-full px-20 py-20 bg-[#EEEFFB]">
            <h2 className="text-[40px] font-bold mb-20">{post?.title}</h2>
            <div>{post?.creator}</div>
            <div>{post?.lang}</div>
            <div>{post?.contents}</div>
          </div>
        </section>

        {/* <Link href={`reviewerlist`}>닫기</Link> */}
        <Link href={`reqreview`}>리뷰 신청하기</Link>
      </main>
    </Modal>
  );
};

export default PostItemModal;
