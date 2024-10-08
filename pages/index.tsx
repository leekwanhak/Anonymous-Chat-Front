import type { NextPage } from "next";

import { useRouter } from "next/router";

import { useEffect, useContext } from "react";

//전역컨텍스트 참조하기
import { GlobalContext } from "@/library/globalContext";

const Home = () => {
  const router = useRouter();

  //전역 상태값에서 로그인한 사용자의 정보 조회하기 위해 컨텍스트 객체 생성
  const { globalData, setGlobalData } = useContext(GlobalContext);

  useEffect(() => {
    console.log("전역 데이터 정보 확인하기:", globalData);
  }, []);

  return (
    <div className="w-full relative bg-custom-dark-blue flex-col items-start justify-start leading-[normal] tracking-[normal]">
      <main
        className={
          "self-stretch  border-black border-[1px] border-solid box-border flex flex-col items-start justify-start min-h-[800px] max-w-full"
        }
      >
        <section className="self-stretch flex flex-col items-start justify-start max-w-full text-left text-base text-white font-plus-jakarta-sans">
          <div className="self-stretch flex flex-row items-start justify-center py-5 px-40 box-border max-w-full mq450:pl-5 mq450:pr-5 mq450:box-border mq750:pl-20 mq750:pr-20 mq750:box-border">
            <div className="flex-1 overflow-hidden flex flex-col items-start justify-start pt-0 px-0 pb-[94px] box-border max-w-[960px] mq1100:max-w-full mq750:pb-[61px] mq750:box-border">
              {/* today matches영역 */}
              <div className="self-stretch flex flex-row flex-wrap items-start justify-start py-4 pl-4 pr-[654px] gap-3 text-17xl mq1100:pr-[327px] mq1100:box-border mq750:pr-[163px] mq750:box-border">
                <div className="flex flex-col items-start justify-start min-w-[288px]">
                  <h1 className="m-0 relative text-inherit tracking-[-1px] leading-[45px] font-extrabold font-[inherit] mq450:text-3xl mq450:leading-[27px] mq750:text-10xl mq750:leading-[36px]">
                    Todays matches
                  </h1>
                </div>
              </div>

              {/* start matching 영역 */}
              <div className="self-stretch flex flex-col items-start justify-start p-4">
                <div className="self-stretch rounded-xl bg-custom-dark-blue border-darkslateblue border-[1px] border-solid flex flex-row items-center justify-between py-[19px] px-[21px] gap-5 mq750:flex-wrap">
                  <div className="w-[314px] flex flex-col items-start justify-start gap-1">
                    <div className="self-stretch flex flex-col items-start justify-start">
                      <b className="self-stretch relative leading-[20px]">
                        Start matching
                      </b>
                    </div>
                    <div className="flex flex-col items-start justify-start text-steelblue">
                      <div className="relative leading-[24px]">
                        Get matched with students at your school
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      router.push("/match");
                    }}
                    className="cursor-pointer [border:none] py-[5.5px] px-4 bg-indigo-600 hover:bg-indigo-500 w-[131px] rounded-2xl overflow-hidden shrink-0 flex flex-row items-center justify-center box-border min-w-[84px] max-w-[480px] mq750:max-w-full"
                  >
                    <div className="flex-1 overflow-hidden flex flex-col items-center justify-start">
                      <div className="self-stretch relative text-sm leading-[21px] font-medium font-plus-jakarta-sans  text-white text-center overflow-hidden text-ellipsis whitespace-nowrap">
                        Start matching
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* matches remaining today 영역 - 남은 횟수 전달 필요*/}
              <div className="self-stretch flex flex-col items-start justify-start pt-4 px-4 pb-2 text-lg">
                <b className="self-stretch relative leading-[23px]">
                  You have 5 matches remaining today
                </b>
              </div>

              {/* find your people 영역 */}
              <div className="self-stretch flex flex-col items-start justify-start p-4 box-border max-w-full">
                <div className="self-stretch rounded-xl flex flex-row items-start justify-between [row-gap:20px] max-w-full gap-0 mq1100:flex-wrap mq450:flex-wrap mq750:flex-wrap mq1275:flex-wrap">
                  <div className="w-[608px] flex flex-col items-start justify-start pt-0 px-0 pb-[42px] box-border gap-1 min-w-[608px] max-w-full mq1100:flex-1 mq1100:min-w-full mq450:flex-1 mq750:flex-1 mq1275:flex-1">
                    <div className="self-stretch flex flex-col items-start justify-start">
                      <b className="self-stretch relative leading-[20px]">
                        Find your people
                      </b>
                    </div>
                    <div className="self-stretch flex flex-col items-start justify-start text-sm text-steelblue">
                      <div className="self-stretch relative leading-[21px]">
                        We are building a safe space for college students to
                        meet and date. We use a mixture of human and AI
                        moderation to help keep our community safe. We also have
                        some features designed to help you meet new people, such
                        as the ability to send a message to someone before
                        matching with them. This is part of our mission to help
                        you find your people. We hope you enjoy using Midnight.
                      </div>
                    </div>
                  </div>
                  <img
                    className="h-[171px] w-[318px] relative rounded-xl overflow-hidden shrink-0 object-cover mq1100:flex-1 mq450:flex-1 mq750:flex-1 mq1275:flex-1"
                    loading="lazy"
                    alt=""
                    src="/home/twopeople.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
