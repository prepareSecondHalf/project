import { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Container, MyPageWrapper, MyPageContent } from 'styles/myPage/myPageStyled';
import SideBar from 'components/MyPage/MyPageSideBar';
import CashHistory from "components/MyPage/CashChargeHistory";

const dummyData = [
    {
        key: 0,
        date: '2023.04.06',
        chargeProce: 10000,
        userPrice: 20000,
        payment: '신용카드',
        state: '진행중',
        note: '취소 불가'
    },
    {
        key: 1,
        date: '2023.04.06',
        chargeProce: 10000,
        userPrice: 20000,
        payment: '신용카드',
        state: '완료',
        note: '취소 불가'
    },
    {
        key: 2,
        date: '2023.04.06',
        chargeProce: 10000,
        userPrice: 20000,
        payment: '신용카드',
        state: '결제 전',
        note: '취소 불가'
    },
]

const CashUsageHistory: NextPage = () => {

    return (
        <>
            <div className="w-full">
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div
                        className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                    >
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        프로필
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        금액
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        시작날짜/만료날짜
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        현재 상황
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        결제 수단
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                                    >
                                        비고
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {dummyData.map(item => {
                                    return (
                                        <tr key={item.key}>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="flex">
                                                    {item.date}
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{item.chargeProce}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{item.userPrice}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <span
                                                    className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                                >
                                                    <span
                                                        aria-hidden
                                                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                                    ></span>
                                                    <span className="relative">{item.payment}</span>
                                                </span>
                                            </td>
                                            <td
                                                className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center"
                                            >
                                                {item.state}
                                            </td>
                                            <td
                                                className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center"
                                            >
                                                {item.note}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CashUsageHistory;