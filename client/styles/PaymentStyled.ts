import Styled from 'styled-components';

const BackDrop = Styled.div`
    @media all and (min-width: 1023px) {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        z-index: 1;
    }
`

const Container = Styled.div`
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
`

export {
    BackDrop,
    Container
}