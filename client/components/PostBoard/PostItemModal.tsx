/** React, Hooks */
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Link from 'next/link';
/** types */
import { IPost } from 'interface/IFcPost';
type ModalProps = {
  pid: String;
  isModalOpen: Boolean;
  toggleModal: () => void;
};
/** utils */
import { Apis } from 'utils/api';
import Modal from './Modal';
import { Button } from './Mixins';

const PostItemModal = (props: ModalProps) => {
  const [post, setPost] = useState<IPost>();
  const { isLoading, error, data } = useQuery('post', () => Apis.get(`/post/${props.pid}`));

  useEffect(() => {
    if (!!data && !!data.post) {
      setPost(data.post);
    }
  }, [data]);

  useEffect(() => {
    console.log('check is modal open!!', props.isModalOpen);
  }, [props.isModalOpen]);

  if (isLoading) return <div>L O A D I N G . . .</div>;

  if (error) {
    console.log(error);
    return <div>ERROR!</div>;
  }
  if (data) {
    console.log('i got data', data);
  }

  return (
    props.isModalOpen && (
      <Modal>
        <main className="w-full h-fit bg-[#ffffff]">
          <section className="flex justify-between items-center py-20 text-[#8A8FB9]">
            <div className="w-full bg-[#EEEFFB]">
              <h2 className="text-[40px] font-bold mb-20">{post?.title}</h2>
              <div>{post?.creator}</div>
              <div>{post?.lang}</div>
              <div>{post?.contents}</div>
            </div>
          </section>

          <Button onClick={props.toggleModal}>닫기</Button>
          <Link href={`reqreview`}>
            <Button>리뷰 신청하기</Button>
          </Link>
        </main>
      </Modal>
    )
  );
};

export default PostItemModal;
