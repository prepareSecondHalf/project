import styled from 'styled-components';

export const Banner = styled.div`
  width: 100vw;
  padding: 5rem 24rem;
  background-color: #eeeffb;
  font-size: 4rem;
  font-family: josefin;
  font-weight: 700;
`;

export const Button = styled.button`
  padding: 1rem 2rem;
  border-radius: 2rem;
  background-color: rgb(238 239 251);
  margin-right: 1rem;
`;

export const ListWrap = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 4rem;
  cursor: pointer;

  & > div {
    /* 이미지로 바꿔야 됨 */
    display: block;
    width: 20rem;
    height: 16rem;
    background-color: rgb(238 239 211);
  }

  section {
    padding: 0.5rem 2rem;
    background-color: rgb(238 239 251);
    flex: 1;

    h4 {
      font-size: 2rem;
      font-weight: 500;
    }
  }
`;
