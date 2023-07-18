/** types */
import { IPost } from 'interface/IFcPost';
import { ImageWrap, ListWrap } from './Mixins';
import { useState } from 'react';
import PostItemModal from './PostItemModal';

type PostListItemProps = {
  post: IPost;
};

const PostListItem = ({ post }: PostListItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  return (
    <ListWrap onClick={toggleModal}>
      <ImageWrap>IMAGE</ImageWrap>
      <section>
        <h4>
          {post.title}({post.register_date.toLocaleString('ko-KR').split('T')[0]})
        </h4>
        <p>reviewer: {post.creator}</p>
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
      </section>
      {isModalOpen && <PostItemModal pid={post._id} isModalOpen={isModalOpen} toggleModal={toggleModal} />}
    </ListWrap>
    // </Link>
  );
};

export default PostListItem;
