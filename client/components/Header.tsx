// 'use client';
import { NextPage } from "next";
import Link from "next/link";
import { useQuery, useMutation } from "react-query";
import { Apis } from "utils/api";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styled from "styled-components";
import { signOut } from "next-auth/react";

const AccountMenus = styled.div`
  display: flex;
  gap: 1.5rem;
`;
const BtnWrap = styled.div``;
const LogOutBtn = styled.button`
  font-weight: 700;
`;

const menus = [
  {
    id: 0,
    path: "mypage",
    content: "마이페이지",
  },
  {
    id: 1,
    path: "써야",
    content: "써야",
  },
  {
    id: 2,
    path: "될지",
    content: "될지",
  },
  {
    id: 3,
    path: "모르겠다!!",
    content: "모르겠다!!",
  },
  {
    id: 4,
    path: "네비게이션!!",
    content: "네비게이션!!",
  },
];

interface loginParam {
  email: string;
  password: string;
  type: string;
  cookies?: string;
}

const Header: NextPage = () => {
  let [isCookie, setIsCookie] = useState(false);
  const [intervalMs, setIntervalMs] = useState(5000);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginType, setLoginType] = useState<string>("");

  // const { status } = useSession();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["logInMutation"],
    // queryKey: ["logInMutation", "logOutMutation"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:8080/user/auth", {
        withCredentials: true,
      });
      return res;
    },
    refetchInterval: intervalMs,
  });

  const logOutMutation = useMutation(
    "logOutMutation",
    async (userInfo: loginParam) => {
      const result = await Apis.post(
        "/user/logout",
        { userInfo },
        { withCredentials: true }
      );

      if (!result.isAuth) {
        console.log(
          "@@@@@@@@@@@@@@@@@@@@@@@logOutMutation success >>>>>>>>>>> ",
          result
        );
        setEmail("");
        setPassword("");
        router.push("/");
      } else {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@logOutMutation fail >>>>>>>>>>> ");
        console.warn("로그아웃 실패", result);
      }
    }
  );

  useEffect(() => {
    // console.log(data?.data.cookie);
    console.log("header ===> ", data);
    if (data?.data?.type === "google") {
      setLoginType("google");
    } else {
      setLoginType("normal");
    }

    if (data?.data?.cookie) {
      data.data.cookie !== undefined && String(data.data.cookie).length > 0;
      setIsCookie(true);
    } else {
      setIsCookie(false);
    }
  }, [data]);

  const handleLogOut = (type: string) => {
    if (type === "google") {
      // queryClient.setQueryData("logOutMutation", true);
      console.log(
        "header google logout",
        email,
        password,
        type,
        document.cookie.slice(7),
        document.cookie
      );

      if (type === "google") {
        logOutMutation.mutate({
          email: email,
          password: password,
          type: "googleLogout",
          cookies: undefined,
        });
        document.cookie = "x_auth = GoogleCookie; max-age=0";
        // () => signOut();
      }
    } else {
      logOutMutation.mutate({
        email: email,
        password: password,
        type: "logout",
        cookies: document.cookie.slice(7) ? document.cookie.slice(7) : "",
      });
      document.cookie = `x_auth = ${document.cookie}; max-age=0;`;
    }
  };

  return (
    <div className="w-full h-fit box-border sticky top-[-44px] z-[1] shadow-md">
      <div className="w-full h-[44px] bg-[#7e33e0] flex justify-center">
        <div className="w-default h-full leading-[44px] flex justify-end">
          <div className="flex gap-6">
            <div className="text-[#f1f1f1] flex font-josefin cursor-pointer">
              English
              <div className="w-2 h-2 mt-3 ml-2 border-[#f1f1f1] border border-l-0 border-t-0 rotate-45 relative top-[2px]"></div>
            </div>
            <div className="text-[#f1f1f1] flex font-josefin cursor-pointer">
              {!isCookie ? (
                <AccountMenus>
                  <Link className="text-white hover:text-white" href="/login">
                    로그인
                  </Link>
                  <Link className="text-white hover:text-white" href="/signup">
                    회원가입
                  </Link>
                </AccountMenus>
              ) : (
                // <div className="w-4 h-4 bg-login bg-no-repeat bg-center mt-3">
                // </div>
                <AccountMenus>
                  <Link className="text-white hover:text-white" href="/mypage">
                    마이페이지
                  </Link>
                  <BtnWrap>
                    {loginType === "google" ? (
                      <LogOutBtn
                        onClick={() => {
                          handleLogOut("google");
                          signOut("google");
                        }}
                        id="signout_btn"
                      >
                        구글 Logout
                      </LogOutBtn>
                    ) : (
                      <LogOutBtn
                        onClick={() => handleLogOut("normal")}
                        id="signout_btn"
                      >
                        일반 Logout
                      </LogOutBtn>
                    )}
                  </BtnWrap>
                </AccountMenus>
              )}
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
                  href={"/" + menu.path}
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
  );
};

export default Header;
