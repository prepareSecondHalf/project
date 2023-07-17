/** React, Hooks */
import { ReactNode } from 'react';
import { Banner } from './Mixins';

type BannerProps = {
  children: ReactNode;
};

const PostBanner = ({ children }: BannerProps) => {
  return <Banner>{children}</Banner>;
};

export default PostBanner;
