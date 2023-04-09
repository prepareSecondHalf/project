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
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

const Container = Styled.div`
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    background-color: #FFF;
    height: 60%;
`

const SideBar = Styled.div`
    width: 240px;
    height: 100%;
    padding: 30px;
    float: left;
    background-color: #EEEFFB;
`

const PaymentContent = Styled.div`
    width: 240px;
    padding: 20px 30px;
    float: left;
`

export {
    BackDrop,
    Container,
    SideBar,
    PaymentContent,
}