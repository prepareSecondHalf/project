/** hooks */
import { Key, useEffect, useState } from 'react';

/** libs */
import axios from 'axios';

/** interface */
interface IPost {
  _id: String;
  title: String;
  contents: String;
  register_date: Date;
  lang: String[];
  per_minute: Number;
  comments?: Object[];
  creator: String;
}

const ReviewerList = () => {
  const [post, setPost] = useState<IPost>();

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/post/6456fb0b4ee6e354c8fa206d');
        console.log('i got a reponse!', response);
        setPost(response?.data?.post);
        console.log('post', post);
      } catch (error) {
        console.log('error occured!!');
        console.dir(error);
      }
    };
    getPost();
  }, []);

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
      </main>
    </>
  );
};

export default ReviewerList;
