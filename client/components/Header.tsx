'use client';

import { NextPage } from 'next';
import { usePathname } from 'next/navigation';

import Link from 'next/link';

const menus = [
	{
		id: 0,
		path: 'mypage',
		content: '마이페이지',
	},
	{
		id: 1,
		path: '써야',
		content: '써야',
	},
	{
		id: 2,
		path: '될지',
		content: '될지',
	},
	{
		id: 3,
		path: '모르겠다!!',
		content: '모르겠다!!',
	},
	{
		id: 4,
		path: '네비게이션!!',
		content: '네비게이션!!',
	},
];

const Header: NextPage = () => {

	const isShow = usePathname()!.indexOf('payment') >= 0 ? false : true;

	return (
		<>
			{/* {isShow ? */}
				<div className="w-full h-fit box-border sticky top-[-44px] z-[1] shadow-md">
					<div className="w-full h-[44px] bg-[#7e33e0] flex justify-center">
						<div className="w-default h-full leading-[44px] flex justify-end">
							<div className="flex gap-6">
								<div className="text-[#f1f1f1] flex font-josefin cursor-pointer">
									English
									<div className="w-2 h-2 mt-3 ml-2 border-[#f1f1f1] border border-l-0 border-t-0 rotate-45 relative top-[2px]"></div>
								</div>
								<div className="text-[#f1f1f1] flex font-josefin cursor-pointer">
									<Link className="text-white hover:text-white" href="/login">
										Login
									</Link>
									<div className="w-4 h-4 bg-login bg-no-repeat bg-center mt-3"></div>
								</div>
							</div>
						</div>
					</div>
					<div className="w-full flex justify-center h-[78px] py-4.75 px-0 bg-white">
						<div className="w-default h-10 leading-10 flex justify-between">
							<div className="flex">
								<div className="font-bold text-[34px] font-josefin pt-[5px]">
									<Link href="/" className="text-[#0d0e43] hover:text-[#0d0e43]">
										REVIEWER
									</Link>
								</div>
								<div className="w-fit h-full flex ml-24 gap-9">
									{menus.map((menu) => (
										<Link
											href={'/' + menu.path}
											key={menu.id}
											className="h-full leading-10  font-lato cursor-pointer transition-colors ease-linear duration-150 hover:text-basered"
										>
											{menu.content}
										</Link>
									))}
								</div>
							</div>
							<div className="w-[317px] h-10 border border-[#e7e6ef] rounded-[4px] box-border bg-white shadow-default flex">
								<input className="w-full h-full outline-none border-none rounded-[4px] bg-white py-0 px-4" />
								<div className="w-[51px] h-10 relative bottom-[1px] rounded-tr-[4px] rounded-br-[4px] bg-basered bg-xsearch bg-no-repeat bg-center cursor-pointer"></div>
							</div>
						</div>
					</div>
				</div>
				{/* // : ''} */}
		</>
	);
};

export default Header;
