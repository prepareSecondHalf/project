/** hooks */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

/** libs */
import axios from 'axios';
import Link from 'next/link';

/** types */
import { IPost } from 'interface/IFcPost';

const ReviewerList = () => {
  const [post, setPost] = useState<IPost>();
  const router = useRouter();
  const pid = (router.query.reviewerpost as string[])[1];

  // data와 response의 차이가 혹시?
  const { isLoading, error, data } = useQuery('post', () => axios.get(`http://localhost:8080/api/post/${pid}`), {
    onSuccess: (res) => {
      console.log('check reponse', res);
      console.log('i got a reponse!', res);
      setPost(res?.data?.post);
    },
  });

  if (isLoading) return <div>L O A D I N G . . .</div>;

  if (error) {
    console.log(error);
    return;
  }
  if (data) {
    console.log('i got data', data);
  }

  // useEffect(() => {
  //   console.log('pid: ', pid);
  //   const getPost = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8080/api/post/${pid}`);
  //       console.log('i got a reponse!', response);
  //       setPost(response?.data?.post);
  //       console.log('post', post);
  //     } catch (error) {
  //       console.log('error occured!!');
  //       console.dir(error);
  //     }
  //   };
  //   getPost();
  // }, []);

  return (
    <>
      <section className="w-full px-96 py-20 bg-[#EEEFFB] text-[40px] font-josefin font-bold">
        <h1>check a post</h1>
      </section>
      <main className="w-full h-fit px-96 bg-[#ffffff]">
        <section className="flex justify-between items-center py-20 text-[#8A8FB9]">
          <div className="w-full px-20 py-20 bg-[#EEEFFB]">
            <h1 className="text-[40px] font-bold mb-20">글을 읽어 보아라</h1>
            <div>{post?.title}</div>
            <div>{post?.creator}</div>
            <div>{post?.lang}</div>
            <div>{post?.contents}</div>
          </div>
        </section>

        <Link href={`reviewer-list`}>뒤로가자</Link>
      </main>
    </>
  );
};

export default ReviewerList;
