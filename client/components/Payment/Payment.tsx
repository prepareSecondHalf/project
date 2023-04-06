import { NextPage } from 'next';
import { useEffect } from 'react';
import { Iamport, RequestPayParams, RequestPayResponse } from '../../interface/IFcPayment';
import { BackDrop, Container, SideBar, PaymentContent } from 'styles/PaymentStyled';

declare global {
    interface Window {
      IMP?: Iamport
    }
}


const Payment: NextPage = () => {

    useEffect(() => {
        window.IMP?.init('imp23735785');
        const amount: number = 1000
        const data: RequestPayParams = {
            pg: `danal_tpay.${9810030929}`,
            pay_method: 'card',
            merchant_uid: `mid_${new Date().getTime()}`,
            amount: amount,
            name : '주문명:결제테스트',
            buyer_email : 'test@portone.io',
            buyer_name : '구매자이름',
            buyer_tel : '010-1234-5678',
            buyer_addr : '서울특별시 강남구 삼성동',
            buyer_postcode : '123-456',
        }
        console.log(data, "  : data")
        let iframe = document.querySelector('iframe') as HTMLIFrameElement;
        console.log(iframe, " : iframe")
        // let iDocument = iframe.contentDocument;
        // console.log(iDocument, " : iDocument")
        // if(iDocument) {
        //     const payWrap = iDocument.querySelector('#wrap') as HTMLBodyElement;
        //     payWrap.style.top = '50%';
        //     payWrap.style.left = '50%';
        //     payWrap.style.position = 'absolute';
        //     payWrap.style.transform = 'translate(-50%, -50%)';
        // }
        const callback = (response: RequestPayResponse) => {
        const { success, merchant_uid, error_msg, imp_uid, error_code } = response
            if (success) {
                console.log(response)
            } else {
                console.log(response)
            }
        }
        window.IMP?.request_pay(data, callback)
        return () => {
            console.log("Component disconnected")
        }
    }, [])

    const onPayment = () => {
        window.IMP?.init('imp23735785');
        // const amount: number = 0
        const amount: number = 1000
        const data: RequestPayParams = {
            // pg: 'A010002002',
            pg: `danal_tpay.${9810030929}`,
            pay_method: 'card',
            merchant_uid: `mid_${new Date().getTime()}`,
            // customer_uid : 'store-cf0756a6-4516-4af1-b718-28cf9d6e07f8',
            amount: amount,
            name : '주문명:결제테스트',
            buyer_email : 'test@portone.io',
            buyer_name : '구매자이름',
            buyer_tel : '010-1234-5678',
            buyer_addr : '서울특별시 강남구 삼성동',
            buyer_postcode : '123-456',
        }
        console.log(data, "  : data")
        const callback = (response: RequestPayResponse) => {
        const { success, merchant_uid, error_msg, imp_uid, error_code } = response
            if (success) {
                console.log(response)
                let iframe = document.querySelector('.imp-dialog iframe') as HTMLIFrameElement;
                let iDocument = iframe.contentDocument;
                if(iDocument) {
                    const payWrap = iDocument.querySelector('#wrap') as HTMLBodyElement;
                    payWrap.style.top = '50%';
                    payWrap.style.left = '50%';
                    payWrap.style.position = 'absolute';
                    payWrap.style.transform = 'translate(-50%, -50%)';
                }
            } else {
                console.log(response)
            }
        }
        window.IMP?.request_pay(data, callback)
    }

    return (
        <>
            <BackDrop>
                {/* <Container>
                    <SideBar>
                        <h2>캐시충전</h2>
                        <p>보유 캐시</p>
                        <p>충전 후 캐시</p>
                    </SideBar>
                    <PaymentContent>
                        <h2>결제수단</h2>
                        <ul className="grid grid-cols-3 gap-4">
                            <li>
                                <button className="border-solid border-2 border-indigo-600 w-full ps-1 h-8">휴대폰</button>
                            </li>
                            <li>
                                <button className="border-solid border-2 border-indigo-600 w-full ps-1 h-8" onClick={onPayment}>신용카드</button>
                            </li>
                            <li>
                                <button className="border-solid border-2 border-indigo-600 w-full ps-1 h-8">카카오페이</button>
                            </li>
                        </ul>
                    </PaymentContent>
                </Container> */}
            </BackDrop>
        </>
    )
}



export default Payment;