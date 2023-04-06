import Styled from 'styled-components';

const Container = Styled.div`
    width: 100%;
    background-color: #FFF;
    display: inline-block;
`

const MyPageWrapper = Styled.div`
    width: 1200px;
    margin: 0 auto;
    padding: 60px 0;
`

const MyPageSideBar = Styled.div`
    width: 200px;
    margin-right: 50px;
    border: 2px solid #EEEFFB;
    float: left;

    & .menu-item {
        display: flex;
        height: 48px;
        margin: 0 10px;
        align-items: center;
        cursor: pointer;
        position: relative;
    }

    & .menu-item + .menu-item {
        border-top: 1px solid #EEEFFB;
    }

    & .menu-item::after {
        content: ' ';
        position: absolute;
        right: 10px;
        width: 10px;
        height: 10px;
        border-left: 1px solid;
        border-bottom: 1px solid;
        transform: translateX(45%) rotate(-135deg);
    }
`

const MyPageContent = Styled.div`
    width: 950px;
    float: left;

    & .profile {
        width: 120px;
        height: 120px;
        background-color: #E2E2E2;
        margin-bottom: 10px;
    }

    & .profile-base {
        display: flex;
    }

    & .profile-box {
        margin-right: 50px;
    }

    & .user-info input:not([type="checkbox"]) {
        width: 100%;
    }

    & .field-label {
        display: block;
        margin-bottom: 5px;
    }

    & .user-name {
        width: 120px;
        margin-bottom: 30px;
    }

    & .user-name span {
        float: right;
    }
`

const MyPageActiveHistory = Styled.div`
    height: 250px;
    border: 1px solid #151875;
    padding: 10px 15px 0;
    display: flex;
    flex-direction: column;

    & .category-title {
        padding-left: 5px;
        padding-bottom: 10px;
        border-bottom: 1px solid #151875;
        position: relative;
    }

    & .category-title:not([data-category="cookie"])::after {
        content: ' ';
        position: absolute;
        right: 10px;
        width: 10px;
        height: 10px;
        border-left: 2px solid;
        border-bottom: 2px solid;
        top: 30%;
        transform: translateX(-50%) rotate(-135deg);
        cursor: pointer;
    }

    & .category-title span {
        float: right;
    }

    & .category-title span button {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
    }

    & .category-list {
        display: flex;
        flex: 1;
        padding: 5px 10px 10px;
        flex-direction: column;
    }

    & .category-list.no-data {
        align-items: center;
        justify-content: center;
    }

    & .category-list .category-item {
        padding-block: 8px 5px;
    }

    & .category-list .category-item + .category-item {
        border-top: 1px dotted;
    }
`

export {
    Container,
    MyPageWrapper,
    MyPageSideBar,
    MyPageContent,
    MyPageActiveHistory,
}