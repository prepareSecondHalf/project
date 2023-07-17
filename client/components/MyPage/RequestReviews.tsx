import { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Container, MyPageWrapper, MyPageContent } from 'styles/myPage/myPageStyled';
import SideBar from 'components/MyPage/MyPageSideBar';
import CashHistory from "components/MyPage/CashChargeHistory";

const dummyData = [
    {
        key: 0,
        profile: '이미지 없음',
        price: '150000',
        startDate: '2023-04-27',
        endedDate: '2023-04-29',
        status: '입금 대기',
        payment: '-',
        note: '-',
    },
    {
        key: 1,
        profile: '이미지 없음',
        price: '450000',
        startDate: '2023-04-27',
        endedDate: '2023-05-01',
        status: '진행중',
        payment: '신용카드',
        note: '-',
    },
    {
        key: 2,
        profile: '이미지 없음',
        price: '50000',
        startDate: '2023-04-27',
        endedDate: '2023-04-28',
        status: '완료',
        payment: '캐시',
        note: '-',
    },
]

const RequestReviews: NextPage = () => {

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
                                        Profile
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
                                        진행상황
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
                                                    {item.profile}
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{item.price}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{item.startDate}{item.endedDate}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <span
                                                    className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                                >
                                                    <span
                                                        aria-hidden
                                                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                                    ></span>
                                                    <span className="relative">{item.status}</span>
                                                </span>
                                            </td>
                                            <td
                                                className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center"
                                            >
                                                {item.payment}
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

export default RequestReviews;