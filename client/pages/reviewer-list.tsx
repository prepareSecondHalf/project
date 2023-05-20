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
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/post/');
        console.log('i got a reponse!', response);
        const sortedPosts = response?.data?.posts.sort((a: IPost, b: IPost) => {
          return new Date(b.register_date).getTime() - new Date(a.register_date).getTime();
        });
        console.log('sorted post', sortedPosts);
        setPosts(sortedPosts);
        console.log('sorted post', posts);
      } catch (error) {
        console.log('error occured!!');
        console.dir(error);
      }
    };
    getPosts();
  }, []);

  return (
    <>
      <section className="w-full px-96 py-20 bg-[#EEEFFB] text-[40px] font-josefin font-bold">
        <h1>Banner of the List</h1>
      </section>
      <main className="w-full h-fit px-96 bg-[#ffffff] font-josefin">
        <section className="flex justify-between items-center py-20 text-[20px]">
          <div className="text-[32px] font-bold">Conditions</div>
          <div className="flex">
            <div className="mr-8">정렬 Radio button</div>
            <div className="mr-8">언어 Select box</div>
            <div>검색 Search bar</div>
          </div>
        </section>
        <section>
          {posts.map((post) => {
            return (
              <div key={post._id as Key} className="w-full flex mb-16 cursor-pointer">
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
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
};

export default ReviewerList;
