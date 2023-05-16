import Styled from 'styled-components';

const ChargeContainer = Styled.div`
    width: 600px;
    margin: 50px auto 0;
    padding-block: 50px;

    & .page-title {
        margin-bottom: 50px;
    }

    & .my-cash {
        background-color: #323232;
        color: #fff;
        padding-inline: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 8px;
        height: 48px;
    }

    & .my-cash p,
    & .my-cash span {
        color: #fff;
    }

    & .my-cash span {
        font-weight: bold;
    }

    & .payment-box {
        margin-block: 60px 40px;
    }

    & .title {
        margin-bottom: 16px;
    }

    & .payment-type {
        margin-block: 20px;
    }

    & .charge-guide {
        background-color: #FAFAFA;
        padding: 16px;
        color: #737373;
    }

    & .guide-title {
        font-size: 18px;
        margin-bottom: 5px;
    }

    & .charge-guide .guide-title,
    & .charge-guide ul,
    & .charge-guide li {
        color: #737373;
    }

    & .charge-guide li {
        position: relative;
        padding-left: 15px;
    }

    & .charge-guide li::before {
        content: '-';
        position: absolute;
        left: 0px;
    }

    & .price-box {
        position: relative;
    }

    & .price-box {
        position: relative;
    }

    & .price-box button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
    }

    & .button-box {
        margin-bottom: 30px;
    }
`

export {
    ChargeContainer,
}