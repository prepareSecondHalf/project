import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { IFcMyInfoResponse, IfcMyCashChargeRequest } from 'interface/MyPage/IFcMyPageInfo';
import { Iamport, RequestPayParams, RequestPayResponse, PaymentMethodType } from 'interface/IFcPayment';
import { IFcChargeCash } from 'interface/Cash/cash';
import { ChargeContainer } from 'styles/myPage/PaymentStyled';

import { Apis } from 'utils/api';
// image
// import Delete from 'public/delete.svg';

// util
import { numberReg, numberComma } from 'utils/util';


declare global {
    interface Window {
        IMP?: Iamport
    }
}

const paymentInitialState = {
    pg: 'html5_inicis.INIpayTest', //테스트 시 html5_inicis.INIpayTest 기재 
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
    // escrow: true, //에스크로 결제인 경우 설정
    // vbank_due: 'YYYYMMDD',
    // bypass: {
    //     acceptmethod: "noeasypay", // 간편결제 버튼을 통합결제창에서 제외(PC)
    //     P_RESERVED: "noeasypay=Y",  // 간편결제 버튼을 통합결제창에서 제외(모바일)
    //     // acceptmethod: 'cardpoint',  // 카드포인트 사용시 설정(PC)
    //     // P_RESERVED : 'cp_yn=Y',     // 카드포인트 사용시 설정(모바일)
    // },
    // period: {
    //     from: "20200101", //YYYYMMDD
    //     to: "20201231"   //YYYYMMDD
    // },
}

const payment: PaymentMethodType = {
    card: {
        pg: 'html5_inicis.INIpayTest',
        pay_method: 'card',
        merchant_uid: "12345",//상점에서 생성한 고유 주문번호
        name: '리뷰어 - 캐시충전',
        amount: 1000,
        buyer_email: 'reviewer@notion.com',
        buyer_name: '구매자이름',
        buyer_tel: '010-1234-5678',   //필수 파라미터 입니다.
        buyer_addr: '서울특별시 강남구 삼성동',
        buyer_postcode: '123-456',
        escrow: true, //에스크로 결제인 경우 설정
        bypass: {
            acceptmethod: "noeasypay", // 간편결제 버튼을 통합결제창에서 제외(PC)
            P_RESERVED: "noeasypay=Y",  // 간편결제 버튼을 통합결제창에서 제외(모바일)
        },
    },
    phone: {
        pg: 'html5_inicis.INIpayTest',
        pay_method: 'phone',
        merchant_uid: "12345",//상점에서 생성한 고유 주문번호
        name: '리뷰어 - 캐시충전',
        amount: 1000,
        buyer_email: 'reviewer@notion.com',
        buyer_name: '구매자이름',
        buyer_tel: '010-1234-5678',   //필수 파라미터 입니다.
        buyer_addr: '서울특별시 강남구 삼성동',
        buyer_postcode: '123-456',
        m_redirect_url: '{모바일에서 결제 완료 후 리디렉션 될 URL}',
        escrow: true, //에스크로 결제인 경우 설정
        bypass: {
            acceptmethod: "noeasypay", // 간편결제 버튼을 통합결제창에서 제외(PC)
            P_RESERVED: "noeasypay=Y",  // 간편결제 버튼을 통합결제창에서 제외(모바일)
        },
    }
}

const paymentInputClassName = `bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500
focus:border-blue-500 block w-full pl-[15px] pl-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-[48px] text-[18px] font-medium`;

// const cashCharge = async () => {
//     try {
//         // const res = await Apis.post('/user-tmp/cashcharge');
//         // return res;
//     } catch(err) {
//         console.error(err, " : Charge Cash Error !!!");
//     }
// }


const chargeCashAPi = async (param: IFcChargeCash) => {
    await Apis.post("/cash/charge", param).then(res => {
        window.location.href = "/mypage";
    });
}

const Charge: NextPage = () => {

    const chargeMutation = useMutation(chargeCashAPi);

    const [paymentInfo, setPaymentInfo] = useState<RequestPayParams>(paymentInitialState);
    const [tempCach, setTempCash] = useState<number>(0);
    const [chargeCash, setChargeCash] = useState<string>('0');
    const [paymentType, setPaymentType] = useState<string>('card');
    const qClient = useQueryClient();
    const data = qClient.getQueryData('getProfile') as IFcMyInfoResponse;
    const state = qClient.getQueryState('getProfile');

    if (state && state.error) {
        console.warn(state.error);
    }

    const handlePaymentType = (e: React.MouseEvent<HTMLElement>) => {
        let radioEl = e.currentTarget.childNodes[0] as HTMLInputElement;
        radioEl.click();
        const payMethod = e.currentTarget.dataset.fieldName;
        
        if (payMethod !== undefined) {
            setPaymentType(payMethod);
        }
    }

    const handleDeleteInputPrice = () => {
        setChargeCash('0');
    }

    // const handleChargeCach = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     let target = e.target as HTMLInputElement;
    //     console.log(target.value);
    //     setChargeCash(target.value);
    //     // setChargeCash(numberComma(target.value));
    //     // target.value = numberComma(target.value);
    // }

    const handleChargeCach = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        let cash = numberReg(target.value);
        
        if (Number(cash) <= 2000000) {
            setChargeCash(numberComma(cash));
        } else {
            alert('충전은 최대 2,000,000원까지 가능합니다.');
        }
    }

    const onChargeCash = () => {
        const { IMP } = window;
        if (data && IMP) {
            IMP.init('imp23735785');
            const amount: number = Number(numberReg(chargeCash));
            let today = new Date();   
            let makeMerchantUid = today.getHours() + today.getMinutes() + today.getSeconds() + today.getMilliseconds();
            
            payment[paymentType].merchant_uid = makeMerchantUid.toString();
            payment[paymentType].amount = amount;
            console.warn(payment[paymentType]);
            setPaymentInfo({...payment[paymentType]});
            
            console.warn(paymentInfo, " : paymentInfo");
            const paymentData = paymentInfo;
    
            const callback = (res: RequestPayResponse) => {
                console.warn(res, " : res req")
                const { success, error_code } = res;
                if (success && res.pay_method && data._id) {
                    console.log("mutate before!")
                    const mutateData: IFcChargeCash = {
                        userid: data._id, amount: Number(res.paid_amount), payment: res.pay_method
                    };
                    
                    chargeMutation.mutate(mutateData);
                } else {
                    alert("결제 실패 사유 : "+ error_code)
                }
            }
            window.IMP?.request_pay(paymentData, callback);
        } else {
            console.log("데이터 확인 필요")
        }
    }

    return (
        <ChargeContainer>
            <h1 className="page-title text-5xl font-extrabold dark:text-white">캐시 충전</h1>
            <div className="my-cash">
                <p>보유 캐시</p>
                <p><span>{tempCach}</span> 캐시</p>
            </div>
            <div className="payment-box general-payment">
                <p className="title font-medium text-[22px]">일반결제</p>
                <div className="price-box">
                    <input type="text" className={paymentInputClassName} value={chargeCash} onChange={handleChargeCach} required />
                    {/* <button onClick={handleDeleteInputPrice}><Delete /></button> */}
                </div>
            </div>
            <div className="payment-box payment-method">
                <div className="title font-medium text-[22px]">결제수단</div>
                <div className="payment-type flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700" onClick={handlePaymentType} data-field-name="card">
                    <input checked id="card" type="radio" value="" name="payment-type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
                                        focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="card" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">신용카드</label>
                </div>
                <div className="payment-type flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700" onClick={handlePaymentType} data-field-name="phone">
                    <input id="phone" type="radio" value="" name="payment-type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
                                        focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="phone" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">휴대폰</label>
                </div>
            </div>
            <div className='button-box'>
                <button className='w-full h-[48px] bg-basered rounded-8 text-white font-roboto cursor-pointer hover:bg-hoverred' onClick={onChargeCash}>충전하기</button>
            </div>
            <div className="charge-guide">
                <p className="guide-title">
                    캐시충전 이용안내
                </p>
                <ul>
                    <li> 모든 상품은 부가세(VAT)포함 가격입니다.</li>
                    <li> 캐시는 현금과 동일한 1:1 비율이며, 서비스 사용을 위해 자유롭게 사용하실 수 있습니다.</li>
                    <li> 캐시를 정기 충전하시면 상품에 따라 일정량의 보너스 캐시가 지급됩니다.</li>
                    <li> 캐시는 세금계산서 발행 대상이 아닙니다. 구매 후 신용카드
                        전표/휴대폰 결제 영수증은 개인소득공제용으로만 사용하실 수 있습니다.</li>
                    <li> 환불 가능 기간은 충전일로부터 5년까지이며, 환불 시 보너스 캐시는 자동으로 차감됩니다.</li>
                    <li> 충전캐시의 유효기간은 충전일로부터 5년입니다.</li>
                    <li> 보너스캐시의 유효기간은 충전일로부터 180일입니다.</li>
                </ul>
            </div>

        </ChargeContainer>
    )
}


export default Charge;