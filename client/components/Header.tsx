import { NextPage } from 'next';
import Link from 'next/link';

const menus = [
  {
    id: 0,
    path: 'home',
    content: 'Home',
  },
  {
    id: 1,
    path: 'pages',
    content: 'Pages',
  },
  {
    id: 2,
    path: 'products',
    content: 'Products',
  },
  {
    id: 3,
    path: 'blog',
    content: 'Blog',
  },
  {
    id: 4,
    path: 'contact',
    content: 'Contact',
  },
];

const Header: NextPage = () => {
  return (
    <div className="w-full h-fit box-border sticky top-[-44px] z-[1] shadow-md">
      <div className="w-full h-[44px] bg-[#7e33e0] flex justify-center">
        Header Top!!
      </div>
      <div className="w-full flex justify-center h-[78px] py-4.75 px-0 bg-white">
        Header Section!!!
      </div>
    </div>
  );
};

export default Header;
