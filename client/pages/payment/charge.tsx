import { NextPage } from "next";
import { useEffect } from 'react';

import { Iamport, RequestPayParams, RequestPayResponse } from '../../interface/IFcPayment';

declare global {
    interface Window {
      IMP?: Iamport
    }
}

const Charge: NextPage = () => {

    useEffect(() => {
        setTimeout(() => {
            
            const { IMP } = window;
            IMP?.init('imp23735785');
            const amount: number = 1000
            const data: RequestPayParams = {
                // pg: `danal_tpay.${9810030929}`,
                pg: `danal_tpay`,
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
    
            const callback = (response: RequestPayResponse) => {
                console.log('why')
                const { success, merchant_uid, error_msg, imp_uid, error_code } = response
                if (success) {
                    console.log(response)
                    window.opener.postMessage(response, '*');
                    window.close();
                } else {
                    console.log(response)
                    window.close();
                }
            }
            window.IMP?.request_pay(data, callback)
        }, 100);
    }, [])

    return (
        <>
            {/* <button className="w-[100px] bg-basered border-none outline-none rounded-3 text-white font-roboto cursor-pointer hover:bg-hoverred"
                onClick={onPayment}>
                카드 충전
            </button>
            <button className="w-[100px] bg-basered border-none outline-none rounded-3 text-white font-roboto cursor-pointer hover:bg-hoverred"
                onClick={onPayment}>
                휴대폰 소액 결제
            </button> */}
        </>
    )
}

export default Charge;