import type { NextPage } from "next";
import Depth4Frame from "@/pages/match/content";

export type GalileoDesignType = {
  className?: string;
};

const GalileoDesign: NextPage<GalileoDesignType> = ({ className = "" }) => {
  return (
    <div
      className={`w-full bg-white max-w-full flex flex-col items-start justify-start leading-[normal] tracking-[normal] ${className}`}
    >
      <main className="self-stretch bg-gray-200 flex flex-col items-start justify-start min-h-[800px] max-w-full">
        <section className="self-stretch flex flex-col items-start justify-start max-w-full text-left text-[32px] text-white font-plus-jakarta-sans">
          <header className="self-stretch border-gainsboro border-b-[1px] border-solid box-border flex flex-row items-center justify-between pt-3 px-10 pb-[11px] top-[0] z-[99] sticky max-w-full gap-0 [row-gap:20px] text-left text-lg text-white font-plus-jakarta-sans">
            <div className="flex flex-row items-center justify-start gap-4">
              <div className="flex flex-col items-start justify-start">
                <div className="w-4 h-4 relative overflow-hidden shrink-0">
                  <img
                    className="absolute top-[0px] left-[0px] w-full h-full"
                    loading="lazy"
                    alt=""
                    src="/vector-0.svg"
                  />
                  <div className="absolute top-[0px] left-[0px] w-[13px] h-[13px]" />
                </div>
              </div>
              <div className="flex flex-col items-start justify-start">
                <a className="[text-decoration:none] relative leading-[23px] font-bold text-[inherit] inline-block min-w-[73px] whitespace-nowrap">
                  Campus
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
                        src="/vector--0-1.svg"
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
                        src="/vector--0-2.svg"
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
                src="/depth-4-frame-2@2x.png"
              />
            </div>
          </header>
          <div className="self-stretch flex flex-row items-start justify-center pt-5 px-40 pb-[22px] box-border max-w-full mq450:pl-5 mq450:pr-5 mq450:box-border mq700:pl-20 mq700:pr-20 mq700:box-border">
            <div className="flex-1 overflow-hidden flex flex-col items-start justify-start max-w-[960px] mq975:max-w-full">
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
              <Depth4Frame
                depth6Frame0="/depth-6-frame-0@2x.png"
                hannah20="Hannah, 20"
                mathematics="Mathematics"
              />
              <Depth4Frame
                depth6Frame0="/depth-6-frame-0-1@2x.png"
                hannah20="Jenna, 21"
                mathematics="Physics"
                propMinWidth="58px"
                propDisplay="inline-block"
              />
              <Depth4Frame
                depth6Frame0="/depth-6-frame-0-2@2x.png"
                hannah20="Lucas, 22"
                mathematics="Computer Science"
                propMinWidth="unset"
                propDisplay="unset"
              />
              <Depth4Frame
                depth6Frame0="/depth-6-frame-0-3@2x.png"
                hannah20="Sarah, 23"
                mathematics="Biology"
                propMinWidth="59px"
                propDisplay="inline-block"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default GalileoDesign;
