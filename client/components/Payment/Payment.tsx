import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { Iamport, RequestPayParams, RequestPayResponse } from '../../interface/IFcPayment';
import { ChargeContainer } from 'styles/myPage/PaymentStyled';

declare global {
    interface Window {
        IMP?: Iamport
    }
}

const paymentInfoState = {
    pg: 'html5_inicis.INIBillTst', //테스트 시 html5_inicis.INIpayTest 기재 
    // pg : 'html5_inicis.INIpayTest', //테스트 시 html5_inicis.INIpayTest 기재 
    // pay_method : 'phone',
    pay_method: 'card',
    merchant_uid: "order_no_0001", //상점에서 생성한 고유 주문번호
    name: '주문명:결제테스트',
    amount: 1000,
    buyer_email: 'test@portone.io',
    buyer_name: '구매자이름',
    buyer_tel: '010-1234-5678',   //필수 파라미터 입니다.
    buyer_addr: '서울특별시 강남구 삼성동',
    buyer_postcode: '123-456',
    m_redirect_url: '{모바일에서 결제 완료 후 리디렉션 될 URL}',
    escrow: true, //에스크로 결제인 경우 설정
    vbank_due: 'YYYYMMDD',
    bypass: {
        acceptmethod: "noeasypay", // 간편결제 버튼을 통합결제창에서 제외(PC)
        P_RESERVED: "noeasypay=Y",  // 간편결제 버튼을 통합결제창에서 제외(모바일)
        // acceptmethod: 'cardpoint',  // 카드포인트 사용시 설정(PC)
        // P_RESERVED : 'cp_yn=Y',     // 카드포인트 사용시 설정(모바일)
    },
    period: {
        from: "20200101", //YYYYMMDD
        to: "20201231"   //YYYYMMDD
    },
}

const Payment: NextPage = () => {

    const [paymentInfo, setPaymentInfo] = useState<RequestPayParams>(paymentInfoState);


    useEffect(() => {
        const { IMP } = window;
        IMP?.init('imp23735785');
        const amount: number = 1000
        const data = paymentInfo;

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

    const handlePaymentType = (e: React.MouseEvent<HTMLElement>) => {
        let radioEl = e.currentTarget.childNodes[0] as HTMLInputElement;
        radioEl.click();
        console.log(radioEl);
    }

    return (
        <ChargeContainer>
            <h1 className="page-title text-5xl font-extrabold dark:text-white">캐시 충전</h1>
            <div className="my-cash">
                <span>보유 캐시</span>
                <span>캐시</span>
            </div>
            <div className="payment-box monthly-payment">
                <p className="title">정기결제</p>
                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                        focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="payment-box general-payment">
                <p className="title">일반결제</p>
                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                        focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="payment-box payment-method">
                <div className="title">결제수단</div>
                <div className="payment-type flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700" onClick={handlePaymentType}>
                    <input checked id="card" type="radio" value="" name="payment-type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
                            focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="card" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">신용카드</label>
                </div>
                <div className="payment-type flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700" onClick={handlePaymentType}>
                    <input id="phone" type="radio" value="" name="payment-type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
                            focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="phone" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">휴대폰</label>
                </div>
                <div className="payment-type flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700" onClick={handlePaymentType}>
                    <input id="kakao" type="radio" value="" name="payment-type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
                            focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="kakao" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">카카오페이</label>
                </div>
            </div>
            <div className="charge-guide">
                <p className="guide-title">
                    캐시충전 이용안내
                </p>
                <ul>
                    <li> 모든 상품은 부가세(VAT)포함 가격입니다.</li>
                    <li> 캐시는 현금과 동일한 1:1 비율이며, 서비스 사용을 위해 자유롭게 사용하실 수 있습니다.</li>
                    <li> 캐시를 정기 충전하시면 상품에 따라 일정량의 보너스 캐시가 지급됩니다.</li>
                    <li> 캐시는 세금계산서 발행 대상이 아닙니다. 구매 후 신용카드 전표/휴대폰 결제 영수증은 개인소득공제용으로만 사용하실 수 있습니다.</li>
                    <li> 환불 가능 기간은 충전일로부터 5년까지이며, 환불 시 보너스 캐시는 자동으로 차감됩니다.</li>
                    <li> 충전캐시의 유효기간은 충전일로부터 5년입니다.</li>
                    <li> 보너스캐시의 유효기간은 충전일로부터 180일입니다.</li>
                </ul>
            </div>
        </ChargeContainer>
    )
}
/**
 *  캐시 이용안내
    모든 상품은 부가세(VAT)포함 가격입니다.
    캐시는 현금과 동일한 1:1 비율이며, 서비스 사용을 위해 자유롭게 사용하실 수 있습니다.
    캐시를 정기 충전하시면 상품에 따라 일정량의 보너스 캐시가 지급됩니다.
    캐시는 세금계산서 발행 대상이 아닙니다. 구매 후 신용카드 전표/휴대폰 결제 영수증은 개인소득공제용으로만 사용하실 수 있습니다.
    환불 가능 기간은 충전일로부터 5년까지이며, 환불 시 보너스 캐시는 자동으로 차감됩니다.
    충전캐시의 유효기간은 충전일로부터 5년입니다.
    보너스캐시의 유효기간은 충전일로부터 180일입니다.
*/
// 마이페이지 > 충전/사용내역 > 환불받고자 하는 충전 건 선택 > 환불하기로 실시간 가능합니다.


export default Payment;