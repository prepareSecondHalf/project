import { NextPage } from 'next';
import { useEffect } from 'react';
import { Iamport, RequestPayParams, RequestPayResponse } from '../components/IFcPayment';
import { BackDrop, Container } from 'styles/PaymentStyled';

declare global {
    interface Window {
      IMP?: Iamport
    }
}

const Payment: NextPage = () => {

    useEffect(() => {
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
            } else {
                console.log(response)
            }
        }
        window.IMP?.request_pay(data, callback)
    }, [])

    return (
        <>
            <BackDrop>
                <Container>

                </Container>
            </BackDrop>
        </>
    )
}



export default Payment;