import type { NextPage } from "next";
import Link from "next/link";

//백엔드 RESTFul API 통신을 위한 axios 패키지 참조하기
import axios from "axios";

const Header = () => {
  const logout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await axios.get("http://localhost:5005/api/member/logout", {
      headers: { Authorization: `Bearer ${token}` },
    });

    //localStorage.removeItem("token"): 브라우저의 localStorage에서 "token"이라는 키를 가진 항목을 제거합니다. 이는 사용자가 로그인할 때 저장된 인증 토큰을 삭제하는 작업입니다.
    localStorage.removeItem("token");
    //window.location.href = "/login": 현재 페이지를 /login 경로로 변경합니다. 이는 사용자를 로그인 페이지로 리디렉션하여 로그아웃 후 다시 로그인할 수 있도록 합니다.
    window.location.href = "/login";
  };

  return (
    <header
      className={
        "self-stretch  bg-custom-dark-blue border-gainsboro border-b-[1px] border-solid box-border flex flex-row items-center justify-between pt-3 px-10 pb-[11px] top-[0] z-[99] sticky max-w-full gap-0 [row-gap:20px] text-left text-lg text-white font-plus-jakarta-sans "
      }
    >
      <div className="flex flex-row items-center justify-start gap-4">
        <div className="flex flex-col items-start justify-start">
          <div className="w-4 h-4 relative overflow-hidden shrink-0">
            <Link className="-m-1.5 p-1.5" href="/">
              <img
                className="absolute top-[0px] left-[0px] w-full h-full"
                loading="lazy"
                alt=""
                src="/applogo.svg"
              />
            </Link>

            <div className="absolute top-[0px] left-[0px] w-[13px] h-[13px]" />
          </div>
        </div>
        <div className="flex flex-col items-start justify-start">
          <a className="[text-decoration:none] relative leading-[23px] font-bold text-[inherit] inline-block min-w-[78px] whitespace-nowrap">
            Midnight
          </a>
        </div>
      </div>

      <div className="w-[1088px] flex flex-row items-start justify-end py-0 pl-[895px] pr-0 box-border gap-8 max-w-full mq1100:pl-[447px] mq1100:box-border mq450:pl-5 mq450:box-border mq750:gap-4 mq750:pl-[223px] mq750:box-border">
        <Link
          href="/login"
          className="[text-decoration:none] self-stretch relative leading-[21px] font-bold font-plus-jakarta-sans text-white text-center overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer [border:none] py-[9.5px] px-4 bg-gray-100 flex-1 rounded-xl  flex flex-row items-center justify-center box-border min-w-[84px] max-w-[480px] mq750:max-w-full text-sm"
        >
          Login
        </Link>

        <button
          type="button"
          onClick={logout}
          className="[text-decoration:none] self-stretch relative leading-[21px] font-bold font-plus-jakarta-sans text-white text-center overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer [border:none] py-[9.5px] px-4 bg-gray-100 flex-1 rounded-xl  flex flex-row items-center justify-center box-border min-w-[84px] max-w-[480px] mq750:max-w-full text-sm"
        >
          Logout
        </button>

        <Link
          href="/regist"
          className="[text-decoration:none] self-stretch relative leading-[21px] font-bold font-plus-jakarta-sans text-white text-center overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer [border:none] py-[9.5px] px-4 bg-gray-100 flex-1 rounded-xl  flex flex-row items-center justify-center box-border min-w-[84px] max-w-[480px] mq750:max-w-full text-sm"
        >
          Regist
        </Link>
      </div>
    </header>
  );
};

export default Header;
