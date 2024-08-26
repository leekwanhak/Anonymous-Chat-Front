// import type { NextPage } from "next";
import MatchPartner from "@/pages/match/content";

import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { MatchPartnerProps } from "@/interfaces/partner";

import axios from "axios";

const Match = () => {
  const router = useRouter();

  const [partners, setPartners] = useState<MatchPartnerProps[]>([]);

  //최초 화면 컴포넌트 렌더링(마운팅)시점에 로컬스토리지내 토큰값 존재여부 체크후
  //1.토큰이 없으면 로그인 하고 오시라고 페이지 리디렉션처리하기
  //2.토큰이 있으면 상대목록 데이터 호출하기
  useEffect(() => {
    //서버 인증 JWT 사용자 인증토큰이 스토리지에 없으면 로그인하고 오시라고 처리
    if (localStorage.getItem("token") == undefined) {
      router.push("/login");
    } else {
      getPartnerList();
    }
  }, []);

  const token = localStorage.getItem("token");

  //비동기 방식으로 백엔드 게시글 목록 데이터 호출함수
  async function getPartnerList() {
    try {
      const res = await axios.get(
        "http://localhost:5005/api/channel/partnerlist",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.code == 200) {
        setPartners(res.data.data);
      } else {
        console.error("서버 에러발생...", res.data.msg);
      }
    } catch (err) {
      console.error("백엔드 API 호출에러발생...");
    }
  }

  return (
    <div className="w-full bg-custom-dark-blue max-w-full flex flex-col items-start justify-start leading-[normal] tracking-[normal]">
      <main className="self-stretch  flex flex-col items-start justify-start min-h-[800px] max-w-full">
        <section className="self-stretch flex flex-col items-start justify-start max-w-full text-left text-[32px] text-white font-plus-jakarta-sans">
          {/* header 영역 */}
          <header className="self-stretch border-gainsboro border-b-[1px] border-solid box-border flex flex-row items-center justify-between pt-3 px-10 pb-[11px] top-[0] z-[99] sticky max-w-full gap-0 [row-gap:20px] text-left text-lg text-white font-plus-jakarta-sans">
            <div className="flex flex-row items-center justify-start gap-4">
              <div className="flex flex-col items-start justify-start">
                <div className="w-4 h-4 relative overflow-hidden shrink-0">
                  <img
                    className="absolute top-[0px] left-[0px] w-full h-full"
                    loading="lazy"
                    alt=""
                    src="/applogo.svg"
                  />
                  <div className="absolute top-[0px] left-[0px] w-[13px] h-[13px]" />
                </div>
              </div>
              <div className="flex flex-col items-start justify-start">
                <a className="[text-decoration:none] relative leading-[23px] font-bold text-[inherit] inline-block min-w-[73px] whitespace-nowrap">
                  Midnight
                </a>
              </div>
            </div>
            <div className="w-[838px] flex flex-row items-start justify-end py-0 pl-[484px] pr-0 box-border gap-8 max-w-full text-sm mq450:w-[676px] mq450:gap-4 mq450:pl-5 mq450:box-border mq950:pl-[242px] mq950:box-border">
              <div className="flex-1 flex flex-row items-center justify-between py-[9.5px] px-0 gap-5 mq450:hidden">
                <div className="flex flex-col items-start justify-start">
                  <a className="[text-decoration:none] relative leading-[21px] font-medium text-[inherit] inline-block min-w-[58px]">
                    Matches
                  </a>
                </div>
                <div className="flex flex-col items-start justify-start">
                  <a className="[text-decoration:none] relative leading-[21px] font-medium text-[inherit] inline-block min-w-[68px]">
                    Messages
                  </a>
                </div>
              </div>
              <div className="flex flex-row items-start justify-start gap-2">
                <div className="h-10 w-10 rounded-xl bg-gray-100 overflow-hidden shrink-0 flex flex-row items-center justify-center p-2.5 box-border max-w-[480px] mq700:max-w-full">
                  <div className="flex flex-col items-center justify-start">
                    <div className="w-5 h-5 relative overflow-hidden shrink-0">
                      <img
                        className="absolute top-[0px] left-[0px] w-full h-full"
                        alt=""
                        src="/match/notice.svg"
                      />
                      <div className="absolute top-[0px] left-[0px] w-[15px] h-4" />
                    </div>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-xl bg-gray-100 overflow-hidden shrink-0 flex flex-row items-center justify-center p-2.5 box-border max-w-[480px] mq700:max-w-full">
                  <div className="flex flex-col items-center justify-start">
                    <div className="w-5 h-5 relative overflow-hidden shrink-0">
                      <img
                        className="absolute top-[0px] left-[0px] w-full h-full"
                        alt=""
                        src="/match/reset.svg"
                      />
                      <div className="absolute top-[0px] left-[0px] w-4 h-[15px]" />
                    </div>
                  </div>
                </div>
              </div>
              <img
                className="h-10 w-10 relative rounded-xl overflow-hidden shrink-0 object-cover min-h-[40px]"
                loading="lazy"
                alt=""
                src="/smallprofile.svg"
              />
            </div>
          </header>

          {/* content 영역 */}
          <div className="self-stretch flex flex-row items-start justify-center pt-5 px-40 pb-[22px] box-border max-w-full mq450:pl-5 mq450:pr-5 mq450:box-border mq700:pl-20 mq700:pr-20 mq700:box-border">
            <div className="flex-1 overflow-hidden flex flex-col items-start justify-start max-w-[960px] mq975:max-w-full">
              {/* Today's matches 영역 */}
              <div className="self-stretch flex flex-row flex-wrap items-start justify-start py-4 pl-4 pr-[399px] gap-3 mq450:pr-5 mq450:box-border mq700:pr-[199px] mq700:box-border">
                <div className="w-72 flex flex-col items-start justify-start gap-3 min-w-[288px]">
                  <div className="self-stretch flex flex-col items-start justify-start">
                    <h1 className="m-0 self-stretch relative text-inherit leading-[40px] font-bold font-[inherit] mq450:text-[19px] mq450:leading-[24px] mq950:text-[26px] mq950:leading-[32px]">
                      Today's matches
                    </h1>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start text-sm text-steelblue">
                    <div className="self-stretch relative leading-[21px]">
                      Your match of the day is waiting for you
                    </div>
                  </div>
                </div>
              </div>

              {/* 채팅 상대 목록- 자식 컴포넌트를 이용해서 map 함수로 돌릴 것임 */}
              {partners.map((partner) => (
                <MatchPartner
                  key={partner.member_id}
                  name={partner.name}
                  department={partner.department}
                  partner={partner}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Match;
