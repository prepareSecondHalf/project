/** React, Hooks */
import { ReactNode } from 'react';
import styled from 'styled-components';

const BackDrop = styled.div`
  background-color: black;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
const Contents = styled.div`
  background-color: white;
  width: 60vw;
  height: 48vh;
`;

type BannerProps = {
  children: ReactNode;
};

const Modal = ({ children }: BannerProps) => {
  return (
    <BackDrop>
      <Contents>{children}</Contents>
    </BackDrop>
  );
};

export default Modal;
