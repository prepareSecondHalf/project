/** Hooks */
import Link from 'next/link';
/** types */
import { IPost } from 'interface/IFcPost';
import { ListWrap } from './Mixins';
import { useState } from 'react';
import PostItemModal from './PostItemModal';

type PostListItemProps = {
  post: IPost;
};

const PostListItem = ({ post }: PostListItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClickItem = () => setIsModalOpen(true);
  return (
    <Link href={`reviewerpost/${post._id}`}>
      <ListWrap onClick={onClickItem}>
        <div>IMAGE</div>
        <section>
          <h4>
            {post.title}({post.register_date.toLocaleString('ko-KR')})
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
      </ListWrap>
    </Link>
  );
};

export default PostListItem;
